import React from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";

const drivers = [
  "Verstappen",
  "Checo",
  "Hamilton",
  "Russel",
  "Leclerc",
  "Sainz",
  "Alsonso",
  "Stroll",
  "Tsunoda",
  "Devries",
  "Sargent",
  "Albon",
  "Bottas",
  "Zhou",
  "Piastri",
  "Norris",
  "Gasly",
  "Ocon",
  "Hulkenberg",
  "Magnussen",
];

const cars = [
  "Red Bull",
  "Mercades",
  "Mclaren",
  "Ferrari",
  "Williams",
  "Alpha Tauri",
  "Alfa Romeo",
  "Aston Martin",
  "Alpine",
  "Haas",
];

function MintView() {
  return (
    <Grid>
      <LargeDriver />
      <div className="col-start-6 col-span-2 place-self-center">
        <h3 className="text-primary"> Coins left</h3>
        <h3 className="text-primary"> Total Spent</h3>
        <button className="btn btn-primary">Mint</button>
      </div>
      <LargeDriver />
      <section className="col-start-1 col-span-6 grid grid-cols-5 bg-neutral rounded-box">
        {drivers.map((driver) => (
          <SmallDriver img={driver} key={driver} />
        ))}
      </section>
      <div className="col-start-8 col-span-4 carousel  carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item h-full w-full ">
          <span className="bg-primary p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full ">
          <span className="bg-blue-100 p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full ">
          <span className="bg-green-200 p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full ">
          <span className="bg-orange-200 p-12 w-full"></span>
        </div>
      </div>
    </Grid>
  );
}

export default MintView;
