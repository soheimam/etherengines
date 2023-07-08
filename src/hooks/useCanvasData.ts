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
  trackNumber?: number,
  driverMain?: number,
  driverSecondary?: number,
  teamNumber?: number
) {
  const [activeRace, setActiveRace] = useState(0);
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

  const { refetch: refrechActiveRace } = useContractRead({
    ...readProps,
    functionName: "activeRace",
    enabled: true,
    onSuccess(data) {
      setActiveRace(data as number);
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
    refetchMintPrep,
    mintTransaction,
    activeRace,
    canvasValue,
    canvasRating,
    mintTransactionPending,
  };
}
