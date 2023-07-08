import Image from "next/image";
import React from "react";

function SmallDriver({ img }: any) {
  return (
    <article className=" m-4 avatar   cursor-pointer ">
      <div className="w-24 mask mask-squircle ">
        <Image
          alt={img}
          src={`https://api.metafuse.me/assets/metafuse/${img}.png`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </article>
  );
}

export default SmallDriver;
