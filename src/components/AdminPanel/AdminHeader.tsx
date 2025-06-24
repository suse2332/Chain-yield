import React from "react";

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="/admin" className="hover:underline">Dashboard</a></li>
          <li><a href="/admin/withdrawals" className="hover:underline">Withdrawals</a></li>
          <li><a href="/admin/settings" className="hover:underline">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
// Placeholder for AdminHeader.tsx