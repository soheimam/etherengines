import Image from "next/image";
import React from "react";

function SmallDriver({ img }: any) {
  return (
    <article className=" m-4 bg-slate-400">
      <Image
        alt={img}
        src={`https://api.metafuse.me/assets/metafuse/${img}.png`}
        width={85}
        height={85}
      />
    </article>
  );
}

export default SmallDriver;
