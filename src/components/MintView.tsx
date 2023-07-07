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

function MintView() {
  return (
    <Grid>
      <LargeDriver />
      <div className="col-start-6 col-span-2 place-self-center">
        <h3 className="text-primary"> Coins left</h3>
        <h3 className="text-primary"> Total Spent</h3>
      </div>
      <LargeDriver />
      <section className="col-start-1 col-span-3 grid grid-cols-4">
        {drivers.map((driver) => (
          <SmallDriver img={driver} key={driver} />
        ))}
      </section>
      <div className="col-start-5 col-span-4 h-96 carousel carousel-vertical rounded-box">
        <div className="carousel-item h-full w-full">
          <span className="bg-primary p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-secondary p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-tertiary p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-pink-300 p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-blue-300 p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-green-300 p-12 w-full"></span>
        </div>
        <div className="carousel-item h-full w-full">
          <span className="bg-primary p-12 w-full"></span>
        </div>
      </div>
      <section className="col-start-10 col-span-3 grid grid-cols-4">
        <SmallDriver />
        <SmallDriver />

        <SmallDriver />

        <SmallDriver />
        <SmallDriver />
        <SmallDriver />

        <SmallDriver />

        <SmallDriver />
        <SmallDriver />
        <SmallDriver />

        <SmallDriver />

        <SmallDriver />
      </section>
    </Grid>
  );
}

export default MintView;
