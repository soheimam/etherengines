import React from "react";
import Grid from "@/components/Layout/Grid";

const Dashboard = () => {
    return (
        <>
        <div className="flex flex-col gap-24">
        <div className="text-base-content">DASHBOARD</div>
        <div className="h-32 text-center border border-secondary rounded-3xl">START GAME</div>
        <div className="text-base-content">Previous Games</div>
        <Grid>
            <div className="col-span-6 border h-32 rounded-3xl text-center">
                Hello Left
            </div>
            <div className="col-span-6 border h-32 rounded-3xl text-center">
                Hello Right
            </div>
        </Grid>
        </div>
        </>
    )
}

export default Dashboard