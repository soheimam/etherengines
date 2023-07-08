import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  erc20ABI,
  UseContractReadConfig,
  useContractReads,
} from "wagmi";
import { MaxUint256 } from "ethers";

import { useState } from "react";
import { abiFetcher } from "@/utils/ABIFetcher";

const NUM_RACES_PER_SEASON = 11;

export function useTokenData(
  usersWalletAddress: `0x${string}`,
  tokenId: number
) {
  const canvasContractAddress = process.env.CANVAS_ADDRESS as `0x${string}`;
  const tokenContractAddress = process.env.TOKEN_ADDRESS as `0x${string}`;
  console.log(canvasContractAddress, tokenContractAddress);

  const [tokenBalanceOf, setTokenBalanceOf] = useState<number>(0);
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
      setTokenBalanceOf(balanceOf); // Do converting here if we need to
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

  const {
    refetch: refetchGetPendingTokensForAllRaces,
    data: getPendingTokensForAllRaces,
  } = useContractRead({
    ...props,
    functionName: "getPendingTokensForAllRaces",
    enabled: true,
    args: [NUM_RACES_PER_SEASON, tokenId],
  });

  return {
    approveCanvasContractPaymentTokenSpend,
    refetchGetPendingTokensForAllRaces,
    getPendingTokensForAllRaces,
    approveCanvasContractPaymentTokenSpendLoading,
    canvasSpendAllowance,
    tokenBalanceOf,
  };
}
