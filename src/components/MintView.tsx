import React, { useEffect, useState } from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";
import CarCard from "./CarCard";
import { useCanvasData } from "@/hooks/useCanvasData";
import { createMetafuseCreatePayload } from "@/utils/NameToNumberMapper";
import { useTokenData } from "@/hooks/useTokenData";

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
  const [selectedFirstDriver, setSelectedFirstDriver] = useState(0);
  const [selectedSecondDriver, setSelectedSecondDriver] = useState(0);

  const { approveCanvasContractPaymentTokenSpend, canvasSpendAllowance } =
    useTokenData(walletAddress, isConnected);
  console.log(canvasSpendAllowance);
  const {
    mintTransaction,
    refrechTokensOfOwner,
    tokensOfOwner,
    refetchMintPrep,
  } = useCanvasData(
    walletAddress,
    isConnected,
    selectedFirstDriver,
    selectedSecondDriver,
    cars.indexOf(selectedTeam) + 1
  );

  useEffect(() => {
    setSelectedFirstDriver(drivers.indexOf(selectedDrivers[0]) + 1);
    setSelectedSecondDriver(drivers.indexOf(selectedDrivers[1]) + 1);
    if (selectedDrivers.length === 2) {
      refetchMintPrep();
    }
  }, [selectedDrivers]);

  const handleDriverSelect = (id: string) => {
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
            console.log(canvasSpendAllowance);
            if (canvasSpendAllowance == 0) {
              approveCanvasContractPaymentTokenSpend!();
              return;
            }
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
          {canvasSpendAllowance == 0 ? "Approve" : "Mint"}
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
