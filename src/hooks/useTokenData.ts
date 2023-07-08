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
  raceNumber?: number,
  tokenId?: number
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
    enabled: true,
  };

  // Token Contract Reads
  const { refetch: refetchContractReads } = useContractReads({
    onSuccess: async (data: any) => {
      const [balanceOf, allowance] = data;
      setTokenBalanceOf(formatUnits(balanceOf.result, "ether")); // Do converting here if we need to
      setCanvasSpendAllowance(allowance);
    },
    enabled: true,
    contracts: [
      {
        ...props,
        functionName: "balanceOf",
        args: [usersWalletAddress],
      },
      {
        ...props,
        functionName: "allowance",
        args: [usersWalletAddress, tokenContractAddress],
      },
    ],
  });

  const { config: prepareClaim } = usePrepareContractWrite({
    abi,
    address: tokenContractAddress,
    functionName: "claimTokens",
    enabled: Boolean(currentPendingTokenAmount > 0 && raceNumber && tokenId),
    args: [raceNumber, tokenId], // The race you are claiming from and your canvas id
  });

  const { data: prepareClaimData, write: claimAllTokens } =
    useContractWrite(prepareClaim);

  const { isLoading: claimTransactionPending } = useWaitForTransaction({
    hash: prepareClaimData?.hash,
    enabled: true,
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
      enabled: true,
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
    enabled: tokenBalanceOf > 0,
    args: [parseUnits("30", "ether")],
  });

  const { data: mintData, write: mintWrite } = useContractWrite(prepareMint);

  const { isLoading: mintTokensPending } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: true,
    onSuccess: async (data: any) => {
      await refetchContractReads();
    },
  });

  const { refetch: refetchGetPendingTokensForAllRaces } = useContractRead({
    onSuccess(data) {
      setCurrentPendingTokenAmount(data as number);
    },
    ...props,
    functionName: "getPendingTokensForAllRaces",
    enabled: Boolean(tokenId),
    args: [NUM_RACES_PER_SEASON, tokenId],
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
