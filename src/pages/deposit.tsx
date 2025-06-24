import React, { useState, useEffect } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { getVipTier, VipTier } from "@/hooks/useVIPLogic";

export default function Deposit() {
  const { walletAddress } = useWalletContext();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [vipTier, setVipTier] = useState<VipTier | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (depositAmount >= 0) {
      const tier = getVipTier(depositAmount);
      setVipTier(tier);
    } else {
      setVipTier(null);
    }
  }, [depositAmount]);

  function handleDeposit() {
    setError("");
    if (depositAmount < 100) {
      setError("Minimum deposit amount is 100 USDC.");
      return;
    }
    if (!walletAddress) {
      setError("Please connect your wallet first.");
      return;
    }

    // TODO: integrate your smart contract deposit logic here

    alert(`Depositing ${depositAmount} USDC from wallet ${walletAddress}`);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4">Make a Deposit</h1>

      {!walletAddress ? (
        <p className="mb-4 text-red-400">Please connect your wallet to deposit.</p>
      ) : (
        <>
          <label htmlFor="deposit" className="block mb-2 font-semibold">
            Deposit Amount (USDC)
          </label>
          <input
            id="deposit"
            type="number"
            min={0}
            step={100}
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            className="w-full p-2 mb-4 text-black rounded"
            placeholder="Enter amount (min 100)"
          />

          {vipTier ? (
            <div className="mb-4 p-3 bg-gray-800 rounded">
              <p>
                <strong>VIP Tier:</strong> {vipTier.name} (Daily Interest:{" "}
                {(vipTier.dailyInterest * 100).toFixed(2)}%)
              </p>
              <p className="text-sm text-gray-400">{vipTier.description}</p>
            </div>
          ) : depositAmount >= 100 ? (
            <div className="mb-4 p-3 bg-gray-800 rounded text-yellow-400">
              No VIP tier available for this deposit amount.
            </div>
          ) : null}

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <button
            onClick={handleDeposit}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded font-semibold"
          >
            Deposit
          </button>
        </>
      )}
    </div>
  );
}
