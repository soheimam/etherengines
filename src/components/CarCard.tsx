import Image from "next/image";
import React from "react";

interface ICarCard {
  carImg: string;
}

function CarCard({ carImg }: ICarCard) {
  console.log(carImg);
  return (
    <article className="carousel-item h-full w-full ">
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
