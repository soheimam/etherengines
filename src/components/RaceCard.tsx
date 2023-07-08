import React, { useState } from "react";
import Image from "next/image";
import { toMetafuseUrl, trackFetcher } from "@/utils/NameToNumberMapper";
import CountdownTimer from "./CountdownTimer";
import { weatherArray } from "@/utils/NameToNumberMapper";

export interface IRaceCard {
  track: number;
  trackData?: { conditions: number; temperature: number };
  active: boolean;
}

const RaceCard = ({ track, trackData, active }: IRaceCard) => {
  const _track = trackFetcher(track);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full justify-between">
        {!active ? (
          <div className="flex flex-col text-left text-2xl pl-6 pt-6">
            <h1>Race Over</h1>
            <h1>Position: 1st</h1>
            <h1>Points: 25</h1>
          </div>
        ) : (
          <div className="flex flex-col text-left text-2xl pl-6 pt-6">
            <h1>Next Race</h1>
            <CountdownTimer />
          </div>
        )}
        <div className="flex flex-col text-right pr-4 pt-2">
          {trackData ? (
            <h1>
              {weatherArray()[trackData.conditions]}, {trackData.temperature}℃
            </h1>
          ) : null}
          <h1>
            {_track.name}, {_track.country}
          </h1>
        </div>
      </div>
      <Image
        alt="car"
        width="200"
        height="200"
        src={toMetafuseUrl(_track.filename)}
      />
    </div>
  );
};

export default RaceCard;
