import { abiFetcher } from "@/utils/ABIFetcher";
import { useState } from "react";
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

export function useCanvasData(
  usersWalletAddress: `0x${string}`,
  trackNumber?: number,
  driverMain?: number,
  driverSecondary?: number,
  teamNumber?: number
) {
  const [activeRace, setActiveRace] = useState<number>(1);
  const [tokensOfOwner, setTokensOfOwner] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const canvasContractAddress = process.env.CANVAS_ADDRESS as `0x${string}`;
  const abi = abiFetcher("Canvas");

  const writeProps: Partial<UsePrepareContractWriteConfig> = {
    address: canvasContractAddress,
    abi,
    enabled: true,
  };

  const readProps: Partial<UseContractReadConfig> = {
    address: canvasContractAddress,
    abi,
  };

  const { refetch: refrechActiveRace } = useContractRead({
    ...readProps,
    functionName: "activeRace",
    enabled: true,
    onSuccess(data) {
      setActiveRace(data as number);
      setIsLoading(false); // Move this to be global over all state in here
    },
    onError(err) {
      console.log(err);
    },
  });

  const { config: prepareMint, refetch: refetchMintPrep } =
    usePrepareContractWrite({
      ...writeProps,
      functionName: "mint",
      args: [1n], // User can only ever mint 1
    });

  const { data: mintData, write: mintTransaction } =
    useContractWrite(prepareMint);

  const { isLoading: mintTransactionPending } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: true,
    onSuccess(data: any) {
      // Do something here on success
    },
  });

  const { refetch: refrechTokensOfOwner } = useContractRead({
    ...readProps,
    functionName: "tokensOfOwner",
    enabled: Boolean(usersWalletAddress),
    args: [usersWalletAddress],
    onSuccess(data) {
      setTokensOfOwner(data as number[]);
    },
    onError(err) {
      console.log(err);
    },
  });

  const { refetch: refrechTrackData, data: trackData } = useContractRead({
    ...readProps,
    functionName: "getTrackData",
    enabled: Boolean(trackNumber),
    args: [trackNumber],
  });

  const { refetch: refreshCanvasRating, data: canvasRating } = useContractRead({
    ...readProps,
    functionName: "getCanvasRating",
    enabled: Boolean(driverMain && driverSecondary && teamNumber),
    args: [driverMain, driverSecondary, teamNumber],
  });

  const { refetch: refreshCanvasValue, data: canvasValue } = useContractRead({
    ...readProps,
    functionName: "getCanvasValue",
    enabled: Boolean(driverMain && driverSecondary && teamNumber),
    args: [driverMain, driverSecondary, teamNumber],
  });

  return {
    trackData,
    refrechTrackData,
    refreshCanvasValue,
    refreshCanvasRating,
    refrechActiveRace,
    isLoading,
    refrechTokensOfOwner,
    tokensOfOwner,
    refetchMintPrep,
    mintTransaction,
    activeRace,
    canvasValue,
    canvasRating,
    mintTransactionPending,
  };
}
