import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "./layouts/dashboard";
import Teamcreator from "./layouts/teamcreator";
import Gameview from "./layouts/gameview";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { xdcTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Homeview from "./layouts/homeview";
import MintView from "@/components/MintView";
import { useState } from "react";

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

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <main
            className={`flex w-full items-center justify-evenly flex-col overflow-hidden min-h-screen px-20`}
          >
            {/* <div className="flex w-full justify-end">
              <Homeview />
            </div> */}

            {/* {(() => {
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
            })()} */}
            <MintView />
            {/*<Gameview />
              <Teamcreator />*/}
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
