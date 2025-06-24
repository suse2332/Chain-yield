import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts[0]) setAddress(accounts[0]);
      });
    }
  }, []);

  return { address };
}
