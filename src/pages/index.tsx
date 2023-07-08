import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "./layouts/dashboard";
import MintView from "@/components/MintView";
import { useEffect, useState } from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Homepage from "@/components/Homepage";
import { useCanvasData } from "@/hooks/useCanvasData";

const inter = Inter({ subsets: ["latin"] });

export enum Pages {
  START,
  DASHBOARD,
  TEAMSELECT,
  LOADING,
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { mintTokensPending, tokenBalanceOf } = useTokenData(
    address as `0x${string}`,
    isConnected
  );
  const { tokensOfOwner, tokenOwnerLoading } = useCanvasData(
    address as `0x${string}`,
    isConnected
  );
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.START);

  useEffect(() => {
    console.log("TOKEN BALANCE", tokenBalanceOf);
    if (tokenOwnerLoading) {
      setCurrentPage(Pages.LOADING);
    } else if (tokenBalanceOf !== "0.0") {
      if (tokensOfOwner.length) {
        setCurrentPage(Pages.DASHBOARD);
      } else {
        setCurrentPage(Pages.TEAMSELECT);
      }
    } else {
      setCurrentPage(Pages.START);
    }
  }, [isConnected, tokenBalanceOf, tokenOwnerLoading]);

  if (mintTokensPending) return <h1>LOADING!</h1>;

  console.log(tokensOfOwner);
  return (
    <>
      <main
        className={`flex w-full justify-start flex-col overflow-hidden min-h-screen px-20`}
      >
        <div className="flex w-full justify-end max-w-[1280px] pt-20 pb-6">
          <div className="">{<ConnectButton />}</div>
          {currentPage === Pages.DASHBOARD && (
            <button
              className="btn w-40"
              onClick={() => setCurrentPage(Pages.TEAMSELECT)}
            >
              Shop
              <br />
              Balance: {tokenBalanceOf}
            </button>
          )}
          {currentPage === Pages.TEAMSELECT && tokensOfOwner.length !== 0 && (
            <button
              className="btn w-40"
              onClick={() => setCurrentPage(Pages.DASHBOARD)}
            >
              Back
            </button>
          )}
        </div>
        {currentPage === Pages.DASHBOARD && (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === Pages.TEAMSELECT && (
          <MintView walletAddress={address} isConnected={isConnected} />
        )}
        {currentPage === Pages.START && <Homepage />}
        {currentPage === Pages.LOADING && (
          <span className="loading loading-ring loading-lg"></span>
        )}
      </main>
    </>
  );
}
