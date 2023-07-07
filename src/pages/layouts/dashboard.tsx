import React from "react";
import Grid from "@/components/Layout/Grid";

const Dashboard = () => {
    return (
        <>
        <div className="flex flex-col gap-32">
        <div className="text-primary">Dashboard</div>
        <div className="h-32 text-center border rounded-3xl">START GAME</div>
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