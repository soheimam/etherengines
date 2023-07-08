import React, { useState } from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";
import CarCard from "./CarCard";
import { useCanvasData } from "@/hooks/useCanvasData";
import { createMetafuseCreatePayload } from "@/utils/NameToNumberMapper";

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

function MintView({ walletAddress, isConnected }: any) {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("Red Bull");

  const {
    mintTransaction,
    refetchMintPrep,
    refrechTokensOfOwner,
    tokensOfOwner,
  } = useCanvasData(
    walletAddress,
    isConnected,
    drivers.indexOf(selectedDrivers[0]),
    drivers.indexOf(selectedDrivers[1], cars.indexOf(selectedTeam))
  );

  const handleDriverSelect = (id: string) => {
    console.log(selectedDrivers);
    if (selectedDrivers.includes(id)) {
      setSelectedDrivers(selectedDrivers.filter((driver) => driver !== id));
    } else if (selectedDrivers.length < 2) {
      setSelectedDrivers([...selectedDrivers, id]);
    }
  };

  return (
    <Grid>
      {selectedDrivers.map((driver, index) => (
        <LargeDriver driverImg={driver} key={index} />
      ))}
      <div className="col-start-6 col-span-2 place-self-center">
        <h3 className="text-primary"> Total Spent</h3>
        <button
          onClick={async () => {
            await refetchMintPrep();
            // mintTransaction();
            console.log(mintTransaction);
            const _payload = createMetafuseCreatePayload({
              tokenId: 5,
              mainDriver: selectedDrivers[0],
              secondaryDriver: selectedDrivers[1],
              team: selectedTeam,
            });
            console.log(_payload);
            console.log(selectedDrivers);
          }}
          className="btn btn-primary"
        >
          Mint
        </button>
      </div>
      <section className="col-start-1 col-span-6 grid grid-cols-5 bg-neutral rounded-box">
        {drivers.map((driver) => (
          <SmallDriver
            onSelect={handleDriverSelect}
            img={driver}
            key={driver}
            selectedDrivers={selectedDrivers}
            clickCount={selectedDrivers.length}
          />
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
