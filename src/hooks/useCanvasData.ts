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
  canvasContractAddress: `0x${string}`,
  trackNumber: number,
  driverMain: number,
  driverSecondary: number,
  teamNumber: number
) {
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

  const { refetch: refrechActiveRace, data: activeRace } = useContractRead({
    ...readProps,
    functionName: "activeRace",
    args: [],
  });

  const { refetch: refrechTrackData, data: trackData } = useContractRead({
    ...readProps,
    functionName: "getTrackData",
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
