// src/components/Wallet/WalletConnect.tsx
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from '@rainbow-me/rainbowkit';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, sepolia], // Add your supported chains here
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: RainbowKitProvider.defaultConnectors({ chains }),
  provider,
});

export default function WalletConnect() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ConnectButton showBalance={false} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
