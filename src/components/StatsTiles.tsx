// ✅ FILE: src/components/StatsTiles.tsx

import { useEffect, useState } from "react";

const StatsTiles = () => {
  const [stats, setStats] = useState({
    totalYield: "421M",
    activeWallets: "138,400+",
    avgDailyYield: "1.7%",
  });

  useEffect(() => {
    // Simulated fetch placeholder
    const fetchStats = async () => {
      // Simulate delay
      await new Promise((res) => setTimeout(res, 500));
      setStats({
        totalYield: "421M",
        activeWallets: "138,400+",
        avgDailyYield: "1.7%",
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-10 text-center">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-purple-500/20 transition">
        <h3 className="text-purple-400 text-xl font-bold">{stats.totalYield}</h3>
        <p className="text-gray-300 text-sm mt-1">Total Yield Earned</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-purple-500/20 transition">
        <h3 className="text-green-400 text-xl font-bold">{stats.activeWallets}</h3>
        <p className="text-gray-300 text-sm mt-1">Active Wallets</p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-purple-500/20 transition">
        <h3 className="text-yellow-400 text-xl font-bold">{stats.avgDailyYield}</h3>
        <p className="text-gray-300 text-sm mt-1">Average Daily Yield</p>
      </div>
    </div>
  );
};

export default StatsTiles;

