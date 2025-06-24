import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { WalletProvider } from '@/context/WalletContext';
import { UserProvider } from '@/context/UserContext';
import { AdminProvider } from '@/context/AdminContext';

import Layout from '@/components/UI/Layout';

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { base } from 'wagmi/chains';

const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'ChainYield',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 🔁 Replace with your real Project ID
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <WalletProvider>
          <UserProvider>
            <AdminProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AdminProvider>
          </UserProvider>
        </WalletProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
