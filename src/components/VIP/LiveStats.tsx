// src/components/LiveStats.tsx
import React, { useEffect, useState } from "react";

const LiveStats = () => {
  const [totalDeposited, setTotalDeposited] = useState(421_000_000);
  const [dailyYield, setDailyYield] = useState(1.7);
  const [charityImpact, setCharityImpact] = useState(2350); // Number of lives impacted, for example

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDeposited((prev) => prev + Math.floor(Math.random() * 1000));
      setCharityImpact((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <div className="bg-[#111] p-6 rounded-2xl shadow-md text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400">
          ${totalDeposited.toLocaleString()}
        </h2>
        <p className="text-gray-400 text-sm">Total Deposited</p>
      </div>
      <div className="bg-[#111] p-6 rounded-2xl shadow-md text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400">
          {dailyYield}%
        </h2>
        <p className="text-gray-400 text-sm">Avg. Daily Yield</p>
      </div>
      <div className="bg-[#111] p-6 rounded-2xl shadow-md text-center border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400">
          {charityImpact.toLocaleString()}
        </h2>
        <p className="text-gray-400 text-sm">Charity Lives Impacted</p>
      </div>
    </div>
  );
};

export default LiveStats;
