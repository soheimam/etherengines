import { abiFetcher } from "@/utils/ABIFetcher";
import {
  createDigitalAsset,
  createMetafuseCreatePayload,
  driverArray,
  getDriverNameFromNumber,
  getTeamNameFromNumber,
  teamArray,
  toMetafuseUrl,
  toTokenUri,
} from "@/utils/NameToNumberMapper";
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
import { BigNumberish, formatUnits } from "ethers";

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
  selectedDrivers?: string[],
  teamName?: string
) {
  const [activeRace, setActiveRace] = useState<number>(1);
  const [tokensOfOwner, setTokensOfOwner] = useState<number[]>([]);
  const [canvasData, setCanvasData] = useState<null | CanvasData>();
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
      enabled: Boolean(selectedDrivers?.length && teamName),
      onSuccess(data) {
        console.log(data);
      },
      args: selectedDrivers?.length
        ? generateMintArgs(selectedDrivers!, teamName!)
        : [], // User can only ever mint 1
    });

  const { data: mintData, write: mintTransaction } =
    useContractWrite(prepareMint);

  const { isLoading: mintTransactionPending } = useWaitForTransaction({
    hash: mintData?.hash,
    enabled: true,
    onSuccess: async (data: any) => {
      const h = await refetchTokensOfOwner();
      console.log(`refetchTokensOfOwner data`, h.data);
      if (Array.isArray(selectedDrivers)) {
        const [firstDriver, secondDriver] = selectedDrivers;
        const tokenId = (h.data as any[])[(h.data as any[]).length - 1];
        const _payload = createMetafuseCreatePayload({
          tokenId: tokenId.toString(),
          mainDriver: firstDriver,
          secondaryDriver: secondDriver,
          team: teamName ? teamName : "",
        });
        console.log(_payload);
        await createDigitalAsset(_payload);
      }
    },
  });

  const { refetch: refetchTokensOfOwner } = useContractRead({
    ...readProps,
    functionName: "tokensOfOwner",
    enabled: Boolean(isConnected && usersWalletAddress),
    args: [usersWalletAddress],
    onSuccess: async (data) => {
      const _tokens = data as number[];
      if (_tokens.length === 0) {
        setCanvasData(null);
        return;
      }
      const lastToken = _tokens[_tokens.length - 1];
      if (lastToken) {
        console.log(`Fetching with token ${lastToken}`);
        const _fetch = await fetch(toTokenUri(lastToken));
        if (_fetch.ok) {
          setCanvasData(await _fetch.json());
        }
      }
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

  // const { refetch: refreshDriverCost, data: driverCost } = useContractRead({
  //   ...readProps,
  //   functionName: "getDriverCost",
  //   enabled: true, //Boolean(isConnected),
  //   args: [driverArray().indexOf("Verstappen") + 1],
  // });

  // console.log("DRIVER COST: ", driverCost);

  const getDriverCost = (driver: string) => {
    const { refetch: refreshDriverCost, data: driverCost } = useContractRead({
      ...readProps,
      functionName: "getDriverCost",
      enabled: true, //Boolean(isConnected),
      args: [driverArray().indexOf(driver) + 1],
    });

    console.log(driverCost, typeof driverCost);

    if (!driverCost) return 0;

    return formatUnits(driverCost as any, "ether");
  };

  // const { refetch: refreshCanvasRating, data: canvasRating } = useContractRead({
  //   ...readProps,
  //   functionName: "getCanvasRating",
  //   enabled: Boolean(
  //     isConnected && driverMain && driverSecondary && teamNumber
  //   ),
  //   args: [driverMain, driverSecondary, teamNumber],
  // });

  // const { refetch: refreshCanvasValue, data: canvasValue } = useContractRead({
  //   ...readProps,
  //   functionName: "getCanvasValue",
  //   enabled: Boolean(
  //     isConnected && driverMain && driverSecondary && teamNumber
  //   ),
  //   args: [driverMain, driverSecondary, teamNumber],
  // });

  return {
    trackDataActive,
    trackDataPrevious,
    refreshTrackDataActive,
    refreshTrackDataPrevious,
    getDriverCost,
    // refreshCanvasValue,
    // refreshCanvasRating,
    refreshActiveRace,
    isLoading,
    refetchTokensOfOwner,
    tokensOfOwner,
    canvasData,
    refetchMintPrep,
    mintTransaction,
    activeRace,
    // canvasValue,
    // canvasRating,
    mintTransactionPending,
  };
}
function generateMintArgs(selectedDrivers: string[], team: string): any {
  const [firstDriver, secondDriver] = selectedDrivers;
  return [
    driverArray().indexOf(firstDriver),
    driverArray().indexOf(secondDriver),
    teamArray().indexOf(team) + 1,
  ];
}
