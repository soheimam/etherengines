import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { publicProvider } from "@wagmi/core/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);
//removed websocket provider
const config = createConfig({
  autoConnect: true,
  publicClient,
});

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "4db57738dc22465254c5f04725062408",
  chains,
});

createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
