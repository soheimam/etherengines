import React from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";

function MintView() {
  return (
    <Grid>
      <LargeDriver />
      <div className="col-start-5 col-span-2">
        <h3 className="text-primary"> Coins left</h3>
        <h3 className="text-primary"> Total Spent</h3>
      </div>
      <LargeDriver />
    </Grid>
  );
}

export default MintView;
