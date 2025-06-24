import { useEffect, useState } from "react";

// ✅ UI Subcomponent
function StatBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-lg text-center">
      <h4 className="text-sm text-zinc-400 uppercase tracking-wide">{title}</h4>
      <p className="text-2xl text-white font-semibold mt-1">{value}</p>
    </div>
  );
}

// ✅ Main LiveStats Component
export default function LiveStats() {
  const [totalYield, setTotalYield] = useState(137_492_100);
  const [activeWallets, setActiveWallets] = useState(9384);
  const [charityImpact, setCharityImpact] = useState(2150000); // e.g., $2.15M

  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalYield((prev) => prev + Math.floor(Math.random() * 3000 + 1000));
      setActiveWallets((prev) => prev + Math.floor(Math.random() * 3));
      setCharityImpact((prev) => prev + Math.floor(Math.random() * 700 + 300));
    }, 4000); // simulate off-chain data growth every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <StatBox title="Total Yield Generated" value={`$${formatNumber(totalYield)}`} />
      <StatBox title="Active Wallets" value={formatNumber(activeWallets)} />
      <StatBox title="Charity Impact (USD)" value={`$${formatNumber(charityImpact)}`} />
    </div>
  );
}
