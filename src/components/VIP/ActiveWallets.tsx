// src/components/ActiveWallets.tsx
import React, { useEffect, useState } from "react";

const generateWallet = () => {
  const chars = "abcdef0123456789";
  const short = () =>
    "0x" +
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("") +
    "..." +
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return short();
};

const generateTime = () => {
  const minutesAgo = Math.floor(Math.random() * 10) + 1;
  return `${minutesAgo} minutes ago`;
};

const ActiveWallets = () => {
  const [wallets, setWallets] = useState<{ address: string; time: string }[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 6 }, () => ({
      address: generateWallet(),
      time: generateTime(),
    }));
    setWallets(initial);

    const interval = setInterval(() => {
      setWallets((prev) => [
        {
          address: generateWallet(),
          time: generateTime(),
        },
        ...prev.slice(0, 5),
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 bg-[#111] p-4 rounded-xl border border-gray-700">
      <h3 className="text-lg text-white font-bold mb-2">Live Deposits</h3>
      <div className="space-y-2 text-sm text-gray-300">
        {wallets.map((w, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{w.address}</span>
            <span className="text-gray-500">{w.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveWallets;
