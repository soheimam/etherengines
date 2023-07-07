import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  UseContractWriteConfig,
  useWaitForTransaction,
  UsePrepareContractWriteConfig,
  erc20ABI,
  UseContractReadConfig,
  useContractReads,
} from "wagmi";
import { MaxUint256, toBigInt } from "ethers";
import { useState } from "react";

export function useCanvasData(oracleContractAddress: `0x${string}`) {
  const abi = abiFetcher("Oracle");

  const props: Partial<UseContractReadConfig> = {
    address: oracleContractAddress,
    abi,
    enabled: true,
  };

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

  return {};
}
