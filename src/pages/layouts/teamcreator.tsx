import LargeDriver from "@/components/LargeDriver";
import Grid from "@/components/Layout/Grid";
import SmallDriver from "@/components/SmallDriver";
import React from "react";

const Teamcreator = () => {
  return (
    <>
      <Grid>
        <LargeDriver />
        <div className="col-start-7 col-span-2">
          <h3 className="text-primary"> Coins left</h3>
          <h3 className="text-primary"> Total Spent</h3>
        </div>
        <LargeDriver />
      </Grid>
    </>
  );
};

export default Teamcreator;
