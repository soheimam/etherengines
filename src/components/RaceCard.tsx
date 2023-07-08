import React, { useState } from "react";
import Image from "next/image";
import { toMetafuseUrl, trackFetcher } from "@/utils/NameToNumberMapper";
import CountdownTimer from "./CountdownTimer";

const RaceCard = (props: any) => {

  const track = trackFetcher(props.track);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full justify-between">
        {!props.active ? (
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
          <h1>Cloud</h1>
          <h1>
            {track.name}, {track.country}
          </h1>
        </div>
      </div>
      <Image
        alt="car"
        width="200"
        height="200"
        src={toMetafuseUrl(track.filename)}
      />
    </div>
  );
};

export default RaceCard;
