import Image from "next/image";
import React from "react";

function LargeDriver() {
  return (
    <article className="pose  col-span-5">
      <Image
        src="/images/driver.png"
        alt="Pose"
        height={500}
        width={500}
        style={{ objectFit: "cover" }}
      />
      <div className="w-full py-4">
        <h3 className="text-secondary"> cost</h3>
        <h3 className="text-secondary"> 0.05 ETH</h3>
      </div>
    </article>
  );
}

export default LargeDriver;
