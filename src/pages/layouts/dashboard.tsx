import React, { Dispatch, SetStateAction, useMemo } from "react";
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
import { Pages } from "..";

interface IDashboard {
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
}

const Dashboard = ({ currentPage, setCurrentPage }: IDashboard) => {
  const { address, isConnected } = useAccount();
  const { activeRace, isLoading, tokensOfOwner } = useCanvasData(
    address as `0x${string}`
  );
  const { currentPendingTokenAmount, claimAllTokens } = useTokenData(
    address as `0x${string}`
  );

  console.log(`Your Tokens: `, tokensOfOwner);
  const isPlaying = true;

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <Grid>
        <div className="col-span-12 text-base-content">
          <h1>DASHBOARD</h1>
        </div>
        {currentPage === Pages.START ? (
          <>
            <div className="col-span-8 flex justify-between bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1>Welcome Sohei</h1>
              <Image
                alt="nft"
                width="200"
                height="200"
                src={toMetafuseUrl("Verstappen")}
              />
            </div>
            <div className="col-span-4 bg-accent/70 border border-secondary rounded-3xl">
              <div className="text-center p-2">Top 10</div>
              <div className="flex flex-col pl-12 pb-2">
                <div>1. 0xFFFF....9f30</div>
                <div>2. 0xFFFF....9f30</div>
                <div>3. 0xFFFF....9f30</div>
              </div>
            </div>
            <div className="col-span-3 flex items-center flex-col justify-center h-72 bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1 className=" text-7xl pb-8">999</h1>
              <p className="text-3xl">Total Wins</p>
            </div>
            <div className="col-span-6 h-72 border border-secondary rounded-3xl bg-accent/70 text-center">
              {activeRace && <RaceCard track={activeRace} active={true} />}
            </div>
            <div className="col-span-3 flex items-center flex-col gap-6 justify-center h-72 bg-accent/70 border border-secondary rounded-3xl p-4">
              <h1 className=" text-7xl pb-8">{currentPendingTokenAmount}</h1>
              <p className="text-3xl">Available to Claim</p>
              <button
                disabled={currentPendingTokenAmount === 0}
                className="btn btn-primary"
                onClick={() => claimAllTokens!()}
              >
                Claim
              </button>
            </div>
          </>
        ) : (
          <button
            className="btn col-span-12 h-72 flex justify-center items-center flex-row border border-secondary rounded-3xl bg-accent/70"
            onClick={() => setCurrentPage(Pages.TEAMSELECT)}
          >
            <PlusCircleIcon className="h-16 w-16 text-accent pr-5" />
            <h1 className="text-5xl">START NEW GAME</h1>
          </button>
        )}
        <div className="col-span-12 text-base-content">
          <h1>Previous Games</h1>
        </div>
        <div className="col-span-6 h-72 border border-secondary rounded-3xl bg-accent/70 text-center">
          {activeRace && <RaceCard track={activeRace - 1} active={false} />}
        </div>
      </Grid>
    </>
  );
};

export default Dashboard;
