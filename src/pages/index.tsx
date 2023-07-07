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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
         <Homeview />
          {/*<Dashboard />
          <Gameview />
  <Teamcreator />*/}
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}
