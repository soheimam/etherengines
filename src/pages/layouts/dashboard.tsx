import React from "react";
import Image from "next/image";
import Grid from "@/components/Layout/Grid";
import RaceCard from "@/components/RaceCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useCanvasData } from "@/hooks/useCanvasData";
import { useTokenData } from "@/hooks/useTokenData";
import {
  driverArray,
  teamArray,
  toMetafuseUrl,
} from "@/utils/NameToNumberMapper";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { activeRace } = useCanvasData();
  const { currentPendingTokenAmount } = useTokenData(address as `0x${string}`);

  const isPlaying = true;

  const StartButton = () => {
    return (
      <div className="col-span-12 h-72 flex justify-center items-center flex-row border border-secondary rounded-3xl bg-accent/70">
        <PlusCircleIcon className="h-16 w-16 text-accent pr-5" />
        <h1 className="text-5xl">START NEW GAME</h1>
      </div>
    );
  };

  return (
    <>
      <Grid>
        <div className="col-span-12 text-base-content">
          <h1>DASHBOARD</h1>
        </div>
        {isPlaying ? (
          <>
            <div className="col-span-8 flex justify-between bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1>Welcome Sohei</h1>
              <Image
                className="rounded-3xl"
                alt="nft"
                width="200"
                height="200"
                src={toMetafuseUrl("Verstappen")}
              />
            </div>
            <div className="col-span-4 bg-accent/70 border border-secondary rounded-3xl">
              <div className="text-center p-2">Top 10</div>
              <div className="flex flex-col w-full pl-12">
                <div>1. Max Verstappen</div>
                <div>2. Lando Norris</div>
                <div>3. Fernando Alonso</div>
              </div>
            </div>
            <div className="col-span-3 flex items-center flex-col justify-center h-72 bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1 className=" text-7xl pb-8">999</h1>
              <p className="text-3xl">Total Wins</p>
            </div>
            <div className="col-span-6 h-72 border border-secondary rounded-3xl bg-accent/70 text-center">
              {`Active: ${activeRace}`}
              <RaceCard track={activeRace} />
            </div>
            <div className="col-span-3 flex items-center flex-col justify-center h-72 bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1 className=" text-7xl pb-8">{currentPendingTokenAmount}</h1>
              <p className="text-3xl">Available to Claim</p>
              <button className="btn btn-primary" onClick={() => {}}>
                Claim
              </button>
            </div>
          </>
        ) : (
          <StartButton />
        )}
        <div className="col-span-12 text-base-content">
          <h1>Previous Games</h1>
        </div>
        <div className="col-span-6 h-72 border border-secondary rounded-3xl bg-accent/70 text-center">
          <RaceCard track={activeRace} />
        </div>
      </Grid>
    </>
  );
};

export default Dashboard;
