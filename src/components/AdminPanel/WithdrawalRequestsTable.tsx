import React from "react";

interface WithdrawalRequest {
  id: string;
  userAddress: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  requestedAt: string; // ISO string date
}

interface WithdrawalRequestsTableProps {
  requests: WithdrawalRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const WithdrawalRequestsTable: React.FC<WithdrawalRequestsTableProps> = ({
  requests,
  onApprove,
  onReject,
}) => {
  return (
    <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-left">
        <tr>
          <th className="px-4 py-2">User Address</th>
          <th className="px-4 py-2">Amount (USDC)</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Requested At</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(({ id, userAddress, amount, status, requestedAt }) => (
          <tr key={id} className="border-b border-gray-700 hover:bg-gray-800">
            <td className="px-4 py-2 font-mono text-sm">{userAddress}</td>
            <td className="px-4 py-2">{amount.toFixed(2)}</td>
            <td className="px-4 py-2 capitalize">{status}</td>
            <td className="px-4 py-2">{new Date(requestedAt).toLocaleString()}</td>
            <td className="px-4 py-2 space-x-2">
              {status === "pending" && (
                <>
                  <button
                    onClick={() => onApprove(id)}
                    className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(id)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
              {status !== "pending" && (
                <span className="italic text-gray-400">No actions</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WithdrawalRequestsTable;
// Placeholder for WithdrawalRequestsTable.tsx