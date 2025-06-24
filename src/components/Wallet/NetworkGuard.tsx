import { ReactNode, useEffect, useState } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";

interface NetworkGuardProps {
  children: ReactNode;
  requiredChainId: number; // e.g., 1 for Ethereum mainnet, 8453 for Base
}

export default function NetworkGuard({ children, requiredChainId }: NetworkGuardProps) {
  const { walletAddress } = useWalletContext();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkNetwork() {
      if (!window.ethereum) {
        setError("No Ethereum provider found. Please install MetaMask.");
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        setCurrentChainId(network.chainId);
        if (network.chainId !== requiredChainId) {
          setError(`Please switch your wallet network to chain ID ${requiredChainId}.`);
        } else {
          setError(null);
        }

        // Listen for network changes
        window.ethereum.on("chainChanged", (chainIdHex: string) => {
          const chainIdNum = parseInt(chainIdHex, 16);
          setCurrentChainId(chainIdNum);
          if (chainIdNum !== requiredChainId) {
            setError(`Please switch your wallet network to chain ID ${requiredChainId}.`);
          } else {
            setError(null);
          }
        });
      } catch {
        setError("Failed to get network info.");
      }
    }

    checkNetwork();

    // Cleanup listener on unmount
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, [requiredChainId, walletAddress]);

  if (error) {
    return (
      <div className="p-6 bg-red-700 text-white rounded-md text-center">
        <p>{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
