import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface ICarCard {
  carImg: string;
  selectedTeam: string;
  setSelectedTeam: Dispatch<SetStateAction<string>>;
}

function CarCard({ carImg, selectedTeam, setSelectedTeam }: ICarCard) {
  return (
    <article
      className={`carousel-item h-full w-full relative ${
        selectedTeam === carImg ? "border border-red-500 rounded-2xl" : ""
      }`}
      onClick={() =>
        selectedTeam.length ? setSelectedTeam("") : setSelectedTeam(carImg)
      }
    >
      <div className="absolute top-10 right-10 badge badge-neutral z-10 font-bold drop-shadow-sm">
        18 Tokens
      </div>
      <div className="flex flex-col justify-center w-full rounded-box bg-gradient-to-r from-gray-800 via-gray-900 to-black relative">
        <Image
          alt={carImg}
          src={`https://api.metafuse.me/assets/metafuse/${carImg}.png`}
          layout="fill"
          objectFit="scale-down"
          objectPosition="center"
        />
      </div>
    </article>
  );
}

export default CarCard;
