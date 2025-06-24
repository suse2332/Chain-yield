import React from "react";

interface AdminStatsProps {
  totalUsers: number;
  pendingWithdrawals: number;
  totalDeposited: number;
}

const AdminStats: React.FC<AdminStatsProps> = ({ totalUsers, pendingWithdrawals, totalDeposited }) => {
  return (
    <div className="grid grid-cols-3 gap-6 bg-gray-900 p-6 rounded-lg text-white">
      <div className="text-center">
        <p className="text-3xl font-bold">{totalUsers}</p>
        <p className="text-gray-400">Total Users</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold">{pendingWithdrawals}</p>
        <p className="text-gray-400">Pending Withdrawals</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold">${totalDeposited.toLocaleString()}</p>
        <p className="text-gray-400">Total Deposited</p>
      </div>
    </div>
  );
};

export default AdminStats;
// Placeholder for AdminStats.tsx