import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import {
  gnosis,
  gnosisChiado,
  scrollTestnet,
  xdc,
  xdcTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [xdc, xdcTestnet, scrollTestnet, gnosis, gnosisChiado],
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

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
