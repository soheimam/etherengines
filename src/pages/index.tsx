import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "./layouts/dashboard";
import Teamcreator from "./layouts/teamcreator";
import Gameview from "./layouts/gameview";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  xdcTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Homeview from "./layouts/homeview";
<<<<<<< HEAD
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
=======
import MintView from "@/components/MintView";
>>>>>>> b0e455d0 (added carousel)

const inter = Inter({ subsets: ["latin"] });

const { chains, publicClient } = configureChains(
  [xdcTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "EtherEngines",
  projectId: "2353623079b50328899d3a664d0aaea5",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export enum Pages {
  START,
  DASHBOARD,
  TEAMSELECT,
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.START);

  const StartButton = () => {
    return (
      <button
        className="btn col-span-12 h-72 flex justify-center items-center flex-row border border-secondary rounded-3xl bg-accent/70"
        onClick={() => setCurrentPage(Pages.TEAMSELECT)}
      >
        <PlusCircleIcon className="h-16 w-16 text-accent pr-5" />
        <h1 className="text-5xl">START NEW GAME</h1>
      </button>
    );
  };

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <main
            className={`flex w-full flex-1 flex-col justify-center  overflow-hidden  min-h-screen  p-24`}
          >
            <div className="flex w-full justify-end">
              <Homeview />
            </div>

            {(() => {
              switch (currentPage) {
                case Pages.START:
                  return <StartButton />;
                case Pages.DASHBOARD:
                  return <Dashboard />;
                case Pages.TEAMSELECT:
                  return <Teamcreator />;
                default:
                  return null; // or some default component
              }
            })()}
            {/*<Gameview />
              <Teamcreator />*/}
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
