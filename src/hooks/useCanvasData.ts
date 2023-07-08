import { abiFetcher } from "@/utils/ABIFetcher";
import { toMetafuseUrl, toTokenUri } from "@/utils/NameToNumberMapper";
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

interface CanvasData {
  name: string;
  description: string;
  image: string;
  edition: number;
  compiler: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
}

export function useCanvasData(
  usersWalletAddress: `0x${string}`,
  isConnected: boolean,
  //trackNumber?: number,
  driverMain?: number,
  driverSecondary?: number,
  teamNumber?: number
) {
  const [activeRace, setActiveRace] = useState<number>(1);
  const [tokensOfOwner, setTokensOfOwner] = useState<number[]>([]);
  const [canvasData, setCanvasData] = useState<(null | CanvasData)[]>();
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

  const { refetch: refreshActiveRace } = useContractRead({
    ...readProps,
    functionName: "activeRace",
    enabled: isConnected,
    onSuccess(data) {
      setActiveRace(1); //data as number);
      setIsLoading(false); // Move this to be global over all state in here
    },
    onError(err) {
      console.log(err);
    },
  });

  console.log(driverMain, driverSecondary, teamNumber);
  const { config: prepareMint, refetch: refetchMintPrep } =
    usePrepareContractWrite({
      ...writeProps,
      functionName: "mint",
      onSuccess(data) {
        console.log(data);
      },
      args: [driverMain, driverSecondary, teamNumber], // User can only ever mint 1
    });

  const { data: mintData, write: mintTransaction } =
    useContractWrite(prepareMint);

  const { isLoading: mintTransactionPending } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: true,
    onSuccess(data: any) {
      console.log(data);
      // Do something here on success
    },
  });

  const { refetch: refrechTokensOfOwner } = useContractRead({
    ...readProps,
    functionName: "tokensOfOwner",
    enabled: Boolean(isConnected && usersWalletAddress),
    args: [usersWalletAddress],
    onSuccess: async (data) => {
      const _tokens = data as number[];
      setTokensOfOwner(data as number[]);
      const canvasData = [];
      for (const _token of _tokens) {
        const _fetch = await fetch(toTokenUri(_token));
        if (_fetch.ok) {
          canvasData.push(await _fetch.json());
        }
      }
      setCanvasData(canvasData);
    },
    onError(err) {
      console.log(err);
    },
  });

  const { refetch: refreshTrackDataActive, data: trackDataActive } =
    useContractRead({
      ...readProps,
      functionName: "getTrackData",
      enabled: Boolean(isConnected && activeRace),
      args: [activeRace],
    });

  const { refetch: refreshTrackDataPrevious, data: trackDataPrevious } =
    useContractRead({
      ...readProps,
      functionName: "getTrackData",
      enabled: Boolean(isConnected && activeRace),
      args: [activeRace - 1],
    });

  const { refetch: refreshCanvasRating, data: canvasRating } = useContractRead({
    ...readProps,
    functionName: "getCanvasRating",
    enabled: Boolean(
      isConnected && driverMain && driverSecondary && teamNumber
    ),
    args: [driverMain, driverSecondary, teamNumber],
  });

  const { refetch: refreshCanvasValue, data: canvasValue } = useContractRead({
    ...readProps,
    functionName: "getCanvasValue",
    enabled: Boolean(
      isConnected && driverMain && driverSecondary && teamNumber
    ),
    args: [driverMain, driverSecondary, teamNumber],
  });

  return {
    trackDataActive,
    trackDataPrevious,
    refreshTrackDataActive,
    refreshTrackDataPrevious,
    refreshCanvasValue,
    refreshCanvasRating,
    refreshActiveRace,
    isLoading,
    refrechTokensOfOwner,
    tokensOfOwner,
    canvasData,
    refetchMintPrep,
    mintTransaction,
    activeRace,
    canvasValue,
    canvasRating,
    mintTransactionPending,
  };
}
