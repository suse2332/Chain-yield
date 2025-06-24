import React, { useState } from "react";
import { useWalletContext } from "@/context/WalletContext";

interface DepositFormProps {
  onDeposit: (amount: number) => Promise<void>;
}

const DepositForm: React.FC<DepositFormProps> = ({ onDeposit }) => {
  const { walletAddress } = useWalletContext();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    if (!walletAddress) {
      setError("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      await onDeposit(numAmount);
      setAmount("");
    } catch (err) {
      setError("Deposit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-md text-white">
      <label htmlFor="depositAmount" className="block mb-2 font-semibold">
        Deposit Amount (USDC)
      </label>
      <input
        id="depositAmount"
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 mb-4 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter USDC amount"
        required
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-md transition"
      >
        {loading ? "Processing..." : "Deposit"}
      </button>
    </form>
  );
};

export default DepositForm;
// Placeholder for DepositForm.tsx