import React from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";
import CarCard from "./CarCard";

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
  "Mercedes",
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
      <div className="col-start-7 col-span-full carousel  carousel-center  p-4 space-x-4 bg-neutral rounded-box">
        {cars.map((car) => (
          <CarCard carImg={car} key={car} />
        ))}
      </div>
    </Grid>
  );
}

export default MintView;
