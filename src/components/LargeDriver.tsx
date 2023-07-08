import Image from "next/image";
import React from "react";
interface ILargeDriver {
  driverImg: string;
}
import silhouteImg from "public/Images/silhoute.png";

function LargeDriver({ driverImg }: ILargeDriver) {
  return (
    <article className="pose  col-span-6 bg-neutral flex items-center flex-col bg-gradient-to-b from-gray-800 00 to-black">
      <Image
        alt={"non descript driver"}
        src={
          driverImg
            ? `https://api.metafuse.me/assets/metafuse/${driverImg}.png`
            : silhouteImg
        }
        priority={true}
        width={300}
        height={300}
        blurDataURL={`https://api.metafuse.me/assets/metafuse/Verstappen.png`}
      />

      <div className="w-full py-4">
        <h3 className="text-secondary font-bold"> {driverImg}</h3>
        <h3 className="text-secondary"> 0.05 ETH</h3>
      </div>
    </article>
  );
}

export default LargeDriver;
