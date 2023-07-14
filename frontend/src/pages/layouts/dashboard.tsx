import React, { Dispatch, SetStateAction, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Grid from "@/components/Layout/Grid";
import RaceCard from "@/components/RaceCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useCanvasData } from "@/hooks/useCanvasData";
import { useTokenData } from "@/hooks/useTokenData";
import {
  driverArray,
  teamArray,
  toMetafuseUrl,
  toTokenUri,
} from "@/utils/NameToNumberMapper";
import { useAccount } from "wagmi";
import { Pages } from "..";
import * as crypto from "crypto";
import { formatUnits, parseUnits } from "ethers";

interface IDashboard {
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>;
}

const generateFakeWallet = (): string => {
  // Generate random 20 bytes long hexadecimal number
  let walletAddress =
    "0x" +
    crypto.randomBytes(2).toString("hex") +
    "..." +
    crypto.randomBytes(2).toString("hex");

  return walletAddress;
};

const Dashboard = ({ currentPage, setCurrentPage }: IDashboard) => {
  const { address, isConnected } = useAccount();
  const {
    activeRace,
    tokensOfOwner,
    trackDataActive,
    trackDataPrevious,
    canvasData,
  } = useCanvasData(address as `0x${string}`, isConnected);

  const { currentPendingTokenAmount, claimAllTokens } = useTokenData(
    address as `0x${string}`,
    isConnected,
    activeRace,
    canvasData
  );

  console.log("Canvas", canvasData);
  console.log(`Your Tokens: `, tokensOfOwner);

  const _tokensOfOwner = ["Win"];

  return (
    <>
      <Grid>
        <div className="col-span-12 text-base-content">
          <h1>DASHBOARD</h1>
        </div>
        <>
          <div className="col-span-8 flex justify-between bg-neutral/70 border border-base-content rounded-3xl p-4">
            <h1 className="w-3/5">
              Welcome to Pitstop Protocol, where every decision counts. As team
              principal, you'll face challenges like pit-stop strategies and
              negotiations. Balancing risk, speed, and innovation is key. Get
              ready for the roar of engines, the grid's glamour, and a chance to
              make history. Join the F1 Manager journey now!
            </h1>
            <div className="carousel rounded-box">
              {_tokensOfOwner.map((token, idx) => {
                return (
                  <div className="carousel-item flex flex-col">
                    <Image
                      alt="nft"
                      className="rounded-3xl"
                      priority={true}
                      width={200}
                      height={200}
                      src={canvasData?.image as string | StaticImageData}
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMzAiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2JsdXIpIi8+PC9zdmc+Cg=="
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-4 bg-neutral/70 border border-base-content rounded-3xl">
            <div className="text-center p-4">Leaderboard - Top 10</div>
            <div className="flex flex-col pl-12 pb-2">
              <div>1. {generateFakeWallet()}</div>
              <div>2. {generateFakeWallet()}</div>
              <div>3. {generateFakeWallet()}</div>
              <div>4. {generateFakeWallet()}</div>
              <div>5. {generateFakeWallet()}</div>
              <div>6. {generateFakeWallet()}</div>
              <div>7. {generateFakeWallet()}</div>
              <div>8. {generateFakeWallet()}</div>
              <div>9. {generateFakeWallet()}</div>
              <div>10. {generateFakeWallet()}</div>
            </div>
          </div>
          <div className="col-span-3 flex items-center flex-col justify-center h-72 bg-neutral/70 border border-base-content rounded-3xl p-4">
            <h1 className=" text-7xl pb-8">17</h1>
            <p className="text-3xl">Total Wins</p>
          </div>
          <div className="col-span-6 h-72 border border-primary rounded-3xl bg-neutral/70 text-center">
            {activeRace && (
              <RaceCard
                track={activeRace}
                trackData={trackDataActive as any}
                active={true}
              />
            )}
          </div>
          <div className="col-span-3 flex items-center flex-col gap-6 justify-center h-72 bg-neutral/70 border border-base-content rounded-3xl p-4">
            <p className="text-xl">Tokens to claim</p>

            <h1 className=" text-7xl pb-8">
              <span>
                {Math.floor(
                  +formatUnits(currentPendingTokenAmount.toString(), "ether")
                )}
              </span>
            </h1>
            <button
              disabled={currentPendingTokenAmount === 0}
              className="btn btn-active btn-secondary"
              onClick={() => claimAllTokens!()}
            >
              Claim
            </button>
          </div>
        </>
        {activeRace - 1 ? (
          <>
            <div className="col-span-12 text-base-content">
              <h1>PREVIOUS RACE</h1>
            </div>
            <div className="col-span-6 h-72 border border-base-content rounded-3xl bg-neutral/70 text-center">
              {activeRace && (
                <RaceCard
                  track={activeRace - 1}
                  trackData={trackDataPrevious as any}
                  active={false}
                />
              )}
            </div>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Dashboard;
