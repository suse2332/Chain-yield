// File: src/utils/web3.ts

import { ethers } from "ethers";
import {
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';

export const CHAIN_ID = 8453; // Base mainnet chain id, replace if needed

// Configure chains and providers
export const { chains, provider, webSocketProvider } = configureChains(
  [base, mainnet],
  [publicProvider()]
);

// Setup connectors for multiple wallets
const connectors = connectorsForWallets([
  {
    groupName: 'Supported Wallets',
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      rainbowWallet({ chains }), // includes Trust Wallet support
    ],
  },
]);

// Create wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// Example: Contract addresses and ABI (replace with your actual ABI & address)
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xYourContractAddressHere";
export const CONTRACT_ABI = [
  // Insert your contract ABI JSON here
];

// Function to get contract instance connected with signer or provider
export function getContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}

// React hooks examples (can import/use in your components)
export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return { address, isConnected, connect, connectors, error, isLoading, pendingConnector, disconnect };
}
