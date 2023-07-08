import React, { useEffect, useState } from "react";
import Grid from "./Layout/Grid";
import LargeDriver from "./LargeDriver";
import SmallDriver from "./SmallDriver";
import CarCard from "./CarCard";
import { useCanvasData } from "@/hooks/useCanvasData";
import { useTokenData } from "@/hooks/useTokenData";
import { driverArray, teamArray } from "@/utils/NameToNumberMapper";

function MintView({ walletAddress, isConnected }: any) {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const {
    mintTransaction,
    refetchMintPrep,
    activeRace,
    canvasData,
    getDriverCost,
  } = useCanvasData(walletAddress, isConnected, selectedDrivers, selectedTeam);

  const { approveCanvasContractPaymentTokenSpend, canvasSpendAllowance } =
    useTokenData(walletAddress, isConnected, activeRace, canvasData);

  const handleDriverSelect = (id: string) => {
    if (selectedDrivers.includes(id)) {
      setSelectedDrivers(selectedDrivers.filter((driver) => driver !== id));
    } else if (selectedDrivers.length < 2) {
      setSelectedDrivers([...selectedDrivers, id]);
    }
  };

  useEffect(() => {
    if (canvasData) {
      console.log("CANVASSSS", canvasData.attributes);
      setSelectedDrivers([
        canvasData.attributes[0].value,
        canvasData.attributes[1].value,
      ]);

      setSelectedTeam(canvasData.attributes[2].value);
    }
  }, [canvasData]);

  return (
    <Grid>
      <LargeDriver
        driverImg={selectedDrivers[0]}
        price={getDriverCost(selectedDrivers[0]).toString()}
        key={"1"}
      />
      <LargeDriver
        driverImg={selectedDrivers[1]}
        price={getDriverCost(selectedDrivers[1]).toString()}
        key={"2"}
      />
      <div className="col-start-6 col-span-2 place-self-center">
        {!canvasData ? (
          <>
            <button
              onClick={async () => {
                if ((canvasSpendAllowance as unknown as bigint) == 0n) {
                  approveCanvasContractPaymentTokenSpend!();
                  return;
                }
                await refetchMintPrep();
                if (mintTransaction) {
                  mintTransaction();
                }
              }}
              className="btn btn-primary"
            >
              {(canvasSpendAllowance as unknown as bigint) == 0n
                ? "Approve"
                : "Mint"}
            </button>
          </>
        ) : null}
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
        {selectedTeam === "" ? (
          teamArray().map((car) => (
            <CarCard
              carImg={car}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              key={car}
            />
          ))
        ) : (
          <CarCard
            carImg={selectedTeam}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            key={selectedTeam}
          />
        )}
      </div>
    </Grid>
  );
}

export default MintView;
