import React, { useEffect, useRef } from "react";
import Grid from "./Layout/Grid";
import { useTokenData } from "@/hooks/useTokenData";
import { useAccount } from "wagmi";

function Homepage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { address, isConnected } = useAccount();
  const { mintWrite, mintLoading, mintTokensPending } = useTokenData(
    address as `0x${string}`,
    isConnected
  );

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const { offsetX, offsetY, target } = e;
      const { offsetWidth: width, offsetHeight: height } = target;
      let moveX = (offsetX / width) * 100 - 50;
      let moveY = (offsetY / height) * 100 - 50;

      titleRef.current!.style.backgroundPosition = `${moveX}% ${moveY}%`;
    };

    titleRef.current!.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on unmount
    return () => {
      if (titleRef.current) {
        titleRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <Grid>
      <h1
        ref={titleRef}
        className="knockout bg-primary col-start-3 col-span-5 font-bold text-primary text-wrap"
      >
        PITSTOP PROTOCOL
      </h1>
      <div className="col-start-3 col-span-5 ">
        <div className="flex">
          <button
            onClick={() => mintWrite!()}
            className="btn btn-outline btn-primary btn-wide mx-4 text-2xl"
          >
            {!mintLoading && !mintTokensPending ? (
              "Get Season Tokens"
            ) : (
              <span className="loading loading-ring loading-lg"></span>
            )}
          </button>
          {/*<button className="btn  btn-wide btn-secondary text-2xl">
            Start Game
  </button>*/}
        </div>
      </div>
    </Grid>
  );
}

export default Homepage;
