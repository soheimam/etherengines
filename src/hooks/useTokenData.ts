import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  erc20ABI,
  UseContractReadConfig,
  useContractReads,
} from "wagmi";
import { MaxUint256, parseUnits, formatUnits } from "ethers";

import { useState } from "react";
import { abiFetcher } from "@/utils/ABIFetcher";

const NUM_RACES_PER_SEASON = 11;

export function useTokenData(
  usersWalletAddress: `0x${string}`,
  isConnected: boolean,
  raceNumber?: number,
  canvasData?: any
) {
  const canvasContractAddress = process.env.CANVAS_ADDRESS as `0x${string}`;
  const tokenContractAddress = process.env.TOKEN_ADDRESS as `0x${string}`;

  const [currentPendingTokenAmount, setCurrentPendingTokenAmount] = useState(0);
  const [tokenBalanceOf, setTokenBalanceOf] = useState<string>("0");
  const [canvasSpendAllowance, setCanvasSpendAllowance] = useState<number>(0);

  const abi = abiFetcher("Token");

  const props: Partial<UseContractReadConfig> = {
    address: tokenContractAddress,
    abi,
    enabled: isConnected,
  };

  // Token Contract Reads
  const { refetch: refetchContractReads } = useContractReads({
    onSuccess: async (data: any) => {
      const [balanceOf, allowance] = data;
      setTokenBalanceOf(
        isConnected ? formatUnits(balanceOf.result, "ether") : "0"
      ); // Do converting here if we need to
      setCanvasSpendAllowance(allowance.result);
    },
    enabled: isConnected,
    contracts: [
      {
        ...props,
        functionName: "balanceOf",
        args: [usersWalletAddress],
      },
      {
        ...props,
        functionName: "allowance",
        args: [usersWalletAddress, canvasContractAddress],
      },
    ],
  });

  const { config: prepareClaim } = usePrepareContractWrite({
    abi,
    address: tokenContractAddress,
    functionName: "claimTokens",
    enabled: Boolean(
      isConnected &&
        currentPendingTokenAmount > 0 &&
        raceNumber &&
        canvasData?.edition
    ),
    args: [raceNumber, canvasData?.edition], // The race you are claiming from and your canvas id
  });

  const { data: prepareClaimData, write: claimAllTokens } =
    useContractWrite(prepareClaim);

  const { isLoading: claimTransactionPending } = useWaitForTransaction({
    hash: prepareClaimData?.hash,
    enabled: isConnected,
    onSuccess: async (data: any) => {
      await refetchContractReads();
      setCurrentPendingTokenAmount(0);
    },
  });

  const { config: prepareApproveOfPaymentToken } = usePrepareContractWrite({
    abi: erc20ABI,
    address: tokenContractAddress,
    functionName: "approve",
    enabled: canvasSpendAllowance === 0,
    args: [canvasContractAddress, MaxUint256],
  });

  const {
    data: approvePaymentTokenSpendData,
    write: approveCanvasContractPaymentTokenSpend,
  } = useContractWrite(prepareApproveOfPaymentToken);

  const { isLoading: approveCanvasContractPaymentTokenSpendLoading } =
    useWaitForTransaction({
      hash: approvePaymentTokenSpendData?.hash,
      enabled: isConnected,
      onSuccess: async (data: any) => {
        await refetchContractReads();
      },
    });

  const { config: prepareMint } = usePrepareContractWrite({
    abi,
    address: tokenContractAddress,
    functionName: "mint",
    onSuccess: async (data: any) => {
      await refetchContractReads();
    },
    enabled: isConnected && tokenBalanceOf === "0",
    args: [parseUnits("30", "ether")],
  });

  const { data: mintData, write: mintWrite } = useContractWrite(prepareMint);

  const { isLoading: mintTokensPending } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: isConnected,
    onSuccess: async (data: any) => {
      await refetchContractReads();
    },
  });

  console.log(`Canvas data `, canvasData);
  console.log(canvasData?.edition);
  const { refetch: refetchGetPendingTokensForAllRaces } = useContractRead({
    onSuccess(data) {
      console.log(`pending amount!`, data);
      setCurrentPendingTokenAmount(data as number);
    },
    ...props,
    functionName: "getPendingTokensForAllRaces",
    enabled: Boolean(isConnected && canvasData?.edition),
    args: [NUM_RACES_PER_SEASON, canvasData?.edition],
  });

  return {
    approveCanvasContractPaymentTokenSpend,
    refetchGetPendingTokensForAllRaces,
    claimAllTokens,
    mintWrite,
    mintTokensPending,
    claimTransactionPending,
    currentPendingTokenAmount,
    approveCanvasContractPaymentTokenSpendLoading,
    canvasSpendAllowance,
    tokenBalanceOf,
  };
}
