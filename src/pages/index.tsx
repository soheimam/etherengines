import Image from "next/image";
import { Inter } from "next/font/google";
import Dashboard from "./layouts/dashboard";
import Teamcreator from "./layouts/teamcreator";
import Gameview from "./layouts/gameview";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Homeview from "./layouts/homeview";
import MintView from "@/components/MintView";

const inter = Inter({ subsets: ["latin"] });

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
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

export default function Home() {
  return (
    <>
      <div>
        <div className="flex min-w-full justify-end p-24">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <Homeview />
            </RainbowKitProvider>
          </WagmiConfig>
        </div>
        <main className="flex w-full flex-1 flex-col justify-center  overflow-hidden  min-h-screen  p-24 ">
          {/* <Dashboard /> */}
          {/*<Gameview />
        <Teamcreator />*/}
          <MintView />
        </main>
      </div>
    </>
  );
}
