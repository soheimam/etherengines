import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "./layouts/dashboard";
import Teamcreator from "./layouts/teamcreator";
import Gameview from "./layouts/gameview";
import MintView from "@/components/MintView";
import { useState } from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export enum Pages {
  START,
  DASHBOARD,
  TEAMSELECT,
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.START);
  const { address, isConnected } = useAccount();
  const { mintTokensPending, tokenBalanceOf } = useTokenData(address as `0x${string}`);

  if (mintTokensPending) return <h1>LOADING"</h1>;

  return (
    <>
      <main
        className={`flex w-full justify-evenly flex-col overflow-hidden min-h-screen px-20`}
      >
        <div className="flex w-full justify-end">
          <div className="">{<ConnectButton />}</div>
          <div>Balance: {tokenBalanceOf}</div>
        </div>

        {(() => {
          switch (currentPage) {
            case Pages.START:
              return (
                <Dashboard
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              );
            case Pages.DASHBOARD:
              return (
                <Dashboard
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              );
            case Pages.TEAMSELECT:
              return <MintView />;
            default:
              return null; // or some default component
          }
        })()}
        {/*<Gameview />
              <Teamcreator />*/}
      </main>
    </>
  );
}
