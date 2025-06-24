"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Countdown from "react-countdown";
import toast from "react-hot-toast";

const VAULT_CONTRACT_ADDRESS = "0x5d048243fCC69ee034719bF3e10dd45eD6640a03";
const VAULT_CONTRACT_ABI = [
  "function deposits(address user) view returns (uint256)",
  "function requestWithdrawal(uint256 amount) external",
  "event WithdrawalRequested(address indexed user, uint256 amount, uint256 timestamp)",
];

const USDC_DECIMALS = 6;

function getVipTier(deposit: number) {
  if (deposit >= 5_000_000) return { name: "Black Diamond", rate: 2.7 };
  if (deposit >= 3_000_000) return { name: "Diamond", rate: 1.98 };
  if (deposit >= 1_000_000) return { name: "Black Gold", rate: 1.7 };
  if (deposit >= 500_000) return { name: "Platinum", rate: 1.5 };
  if (deposit >= 300_000) return { name: "Gold", rate: 1.3 };
  if (deposit >= 100_000) return { name: "Silver", rate: 1.1 };
  if (deposit >= 10_000) return { name: "Bronze", rate: 0.9 };
  if (deposit >= 1_000) return { name: "Iron", rate: 0.7 };
  return { name: "No Tier", rate: 0 };
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [deposit, setDeposit] = useState<number>(0);
  const [withdrawals, setWithdrawals] = useState<
    { amount: number; txHash: string; timestamp: number }[]
  >([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastInterestUpdate, setLastInterestUpdate] = useState<Date>(new Date());
  const [liveInterest, setLiveInterest] = useState(0);
  const [countdownKey, setCountdownKey] = useState(0);

  useEffect(() => {
    if (!isConnected || !address) return;
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(web3Provider);
    const vaultContract = new ethers.Contract(
      VAULT_CONTRACT_ADDRESS,
      VAULT_CONTRACT_ABI,
      web3Provider
    );
    setContract(vaultContract);
  }, [isConnected, address]);

  const fetchDeposit = useCallback(async () => {
    if (!contract || !address) return;
    try {
      const rawDeposit = await contract.deposits(address);
      const depositAmount = Number(ethers.utils.formatUnits(rawDeposit, USDC_DECIMALS));
      setDeposit(depositAmount);
    } catch (err) {
      console.error("Failed to fetch deposit:", err);
      setDeposit(0);
    }
  }, [contract, address]);

  const fetchWithdrawalHistory = useCallback(async () => {
    if (!contract || !address || !provider) return;
    try {
      const filter = contract.filters.WithdrawalRequested(address);
      const latestBlock = await provider.getBlockNumber();
      const fromBlock = Math.max(latestBlock - 100000, 0);
      const events = await contract.queryFilter(filter, fromBlock, latestBlock);
      const parsed = events.map((ev) => {
        const { amount, timestamp } = ev.args;
        return {
          amount: Number(ethers.utils.formatUnits(amount, USDC_DECIMALS)),
          txHash: ev.transactionHash,
          timestamp: timestamp.toNumber() * 1000,
        };
      });
      parsed.sort((a, b) => b.timestamp - a.timestamp);
      setWithdrawals(parsed);
    } catch (err) {
      console.error("Failed to fetch withdrawal history:", err);
      setWithdrawals([]);
    }
  }, [contract, address, provider]);

  useEffect(() => {
    if (!contract || !address) return;
    fetchDeposit();
    fetchWithdrawalHistory();
    setLastInterestUpdate(new Date());
  }, [contract, address, fetchDeposit, fetchWithdrawalHistory]);

  const vipTier = getVipTier(deposit);

  useEffect(() => {
    if (deposit <= 0 || vipTier.rate === 0) {
      setLiveInterest(0);
      return;
    }
    const dailyRate = vipTier.rate / 100;
    const periodRate = dailyRate / 6;
    const updateInterest = () => {
      const now = Date.now();
      const diffMs = now - lastInterestUpdate.getTime();
      const periodsPassed = diffMs / (4 * 60 * 60 * 1000);
      const accrued = deposit * (Math.pow(1 + periodRate, periodsPassed) - 1);
      setLiveInterest(accrued);
    };
    updateInterest();
    const interval = setInterval(updateInterest, 10000);
    return () => clearInterval(interval);
  }, [deposit, vipTier.rate, lastInterestUpdate]);

  const getNextInterestUpdateTime = () => {
    const now = new Date();
    const msPerPeriod = 4 * 60 * 60 * 1000;
    const elapsed = now.getTime() % msPerPeriod;
    return new Date(now.getTime() + (msPerPeriod - elapsed));
  };

  const handleWithdrawRequest = async () => {
    if (!contract || !address || !provider) return;
    const amountNum = Number(withdrawAmount);
    if (!amountNum || amountNum <= 0) {
      toast.error("Enter a valid withdrawal amount");
      return;
    }
    if (amountNum > liveInterest) {
      toast.error("Cannot withdraw more than accrued interest");
      return;
    }
    setIsSubmitting(true);
    try {
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.requestWithdrawal(
        ethers.utils.parseUnits(withdrawAmount, USDC_DECIMALS)
      );
      toast("Transaction sent...");
      await tx.wait();
      toast.success("Withdrawal request submitted");
      setWithdrawAmount("");
      fetchWithdrawalHistory();
      fetchDeposit();
    } catch (err: any) {
      console.error(err);
      toast.error("Withdrawal failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          {isConnected ? (
            <div className="flex items-center gap-4">
              <span className="font-mono bg-gray-800 px-3 py-1 rounded">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              {connectors.map((conn) => (
                <button
                  key={conn.id}
                  onClick={() => connect({ connector: conn })}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Connect {conn.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {!isConnected && (
        <p className="text-center text-gray-400 mt-20">
          Please connect your wallet to view your dashboard.
        </p>
      )}

      {isConnected && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Total Deposit</h2>
              <p className="text-3xl font-mono">{deposit.toLocaleString()} USDC</p>
            </div>
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">VIP Tier</h2>
              <p className="text-2xl font-bold">{vipTier.name}</p>
              <p className="text-gray-400">{vipTier.rate}% daily</p>
            </div>
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Live Interest</h2>
              <p className="text-3xl font-mono">
                {liveInterest.toFixed(4)} USDC
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Next update in{" "}
                <Countdown
                  date={getNextInterestUpdateTime()}
                  key={countdownKey}
                  onComplete={() => setCountdownKey((k) => k + 1)}
                />
              </p>
            </div>
          </section>

          <section className="mb-10 max-w-md bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
            <input
              type="number"
              placeholder="Amount (USDC)"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
            />
            <button
              onClick={handleWithdrawRequest}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Withdrawal History</h2>
            {withdrawals.length === 0 ? (
              <p className="text-gray-400">No withdrawals yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded shadow">
                  <thead>
                    <tr className="text-left text-gray-400 uppercase text-sm border-b border-gray-700">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map(({ amount, txHash, timestamp }) => (
                      <tr key={txHash} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-4 py-3">{new Date(timestamp).toLocaleString()}</td>
                        <td className="px-4 py-3">{amount.toFixed(4)}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://basescan.org/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {txHash.slice(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}


