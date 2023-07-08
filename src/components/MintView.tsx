import React, { useEffect, useState } from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";
import CarCard from "./CarCard";
import { useCanvasData } from "@/hooks/useCanvasData";
import { useTokenData } from "@/hooks/useTokenData";
import { driverArray, teamArray } from "@/utils/NameToNumberMapper";

// const drivers = [
//   "Verstappen",
//   "Checo",
//   "Hamilton",
//   "Russel",
//   "Leclerc",
//   "Sainz",
//   "Alsonso",
//   "Stroll",
//   "Tsunoda",
//   "Devries",
//   "Sargent",
//   "Albon",
//   "Bottas",
//   "Zhou",
//   "Piastri",
//   "Norris",
//   "Gasly",
//   "Ocon",
//   "Hulkenberg",
//   "Magnussen",
// ];

// const cars = [
//   "Red Bull",
//   "Mercedes",
//   "Mclaren",
//   "Ferrari",
//   "Williams",
//   "Alpha Tauri",
//   "Alfa Romeo",
//   "Aston Martin",
//   "Alpine",
//   "Haas",
// ];

function MintView({ walletAddress, isConnected }: any) {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("Haas");
  // const [selectedFirstDriver, setSelectedFirstDriver] = useState(0);
  // const [selectedSecondDriver, setSelectedSecondDriver] = useState(0);

  const { approveCanvasContractPaymentTokenSpend, canvasSpendAllowance } =
    useTokenData(walletAddress, isConnected);
  const { mintTransaction, refetchMintPrep } = useCanvasData(
    walletAddress,
    isConnected,
    selectedDrivers,
    selectedTeam
  );

  // useEffect(() => {
  //   console.log(selectedDrivers);
  //   const [firstDriver, secondDriver] = selectedDrivers;
  //   console.log(`firstDriver ${firstDriver}`);
  //   console.log(`second Driver ${secondDriver}`);

  //   const driverId = driverArray().indexOf(firstDriver) + 1);
  //   setSelectedSecondDriver(driverArray().indexOf(secondDriver) + 1);
  //   console.log(`firstDriver ${firstDriver}`);
  //   console.log(`second Driver ${secondDriver}`);

  //   if (selectedDrivers.length === 2) {
  //     refetchMintPrep();
  //   }
  // }, [selectedDrivers]);

  const handleDriverSelect = (id: string) => {
    if (selectedDrivers.includes(id)) {
      setSelectedDrivers(selectedDrivers.filter((driver) => driver !== id));
    } else if (selectedDrivers.length < 2) {
      setSelectedDrivers([...selectedDrivers, id]);
    }
  };

  return (
    <Grid>
      <LargeDriver driverImg={selectedDrivers[0]} key={"1"} />
      <LargeDriver driverImg={selectedDrivers[1]} key={"2"} />
      {/*selectedDrivers.map((driver, index) => (
        <LargeDriver driverImg={driver} key={index} />
      ))*/}
      <div className="col-start-6 col-span-2 place-self-center">
        <h3 className="text-primary"> Total Spent</h3>
        <button
          onClick={async () => {
            if ((canvasSpendAllowance as unknown as bigint) == 0n) {
              approveCanvasContractPaymentTokenSpend!();
              return;
            }
            await refetchMintPrep();
            mintTransaction!();
          }}
          className="btn btn-primary"
        >
          {(canvasSpendAllowance as unknown as bigint) == 0n
            ? "Approve"
            : "Mint"}
        </button>
      </div>
      <section className="col-start-1 col-span-6 grid grid-cols-5 bg-neutral rounded-box">
        {driverArray().map((driver) => (
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
        {teamArray().map((car) => (
          <CarCard carImg={car} key={car} />
        ))}
      </div>
    </Grid>
  );
}

export default MintView;
