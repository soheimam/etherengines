import React, { useEffect, useRef } from "react";
import Grid from "./Layout/Grid";

function Homepage() {
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { offsetX, offsetY, target } = e;
      const { offsetWidth: width, offsetHeight: height } = target;
      let moveX = (offsetX / width) * 100 - 50;
      let moveY = (offsetY / height) * 100 - 50;

      titleRef.current.style.backgroundPosition = `${moveX}% ${moveY}%`;
    };

    titleRef.current.addEventListener("mousemove", handleMouseMove);

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
    </Grid>
  );
}

export default Homepage;
