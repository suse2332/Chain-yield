import React, { useState, useEffect } from "react";
import { useWalletContext } from "@/context/WalletContext";
import { useUserContext } from "@/context/UserContext";
import Button from "@/components/UI/Button";

export default function Withdraw() {
  const { walletAddress } = useWalletContext();
  const { totalYield } = useUserContext();

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [withdrawAmount]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg("Please enter a valid withdrawal amount.");
      return;
    }
    if (amount > totalYield) {
      setErrorMsg("Withdrawal amount exceeds your available interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual contract call or API request
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async call
      setSuccessMsg(`Withdrawal request for ${amount} USDC submitted successfully.`);
      setWithdrawAmount("");
    } catch (error) {
      setErrorMsg("Failed to submit withdrawal request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Withdraw Interest</h1>

      {!walletAddress ? (
        <p className="text-red-500">Please connect your wallet to withdraw interest.</p>
      ) : (
        <>
          <p className="mb-4">
            Your available interest:{" "}
            <span className="font-mono text-green-400">{totalYield.toFixed(4)} USDC</span>
          </p>

          <form onSubmit={handleWithdraw} className="space-y-4">
            <label htmlFor="withdraw" className="block font-semibold">
              Amount to withdraw (USDC)
            </label>
            <input
              type="number"
              id="withdraw"
              step="0.0001"
              min="0"
              max={totalYield}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
              disabled={isSubmitting}
            />

            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {successMsg && <p className="text-green-400">{successMsg}</p>}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Withdrawal"}
            </Button>
          </form>
        </>
      )}
    </main>
  );
}
