import React from "react";

interface ApproveRejectButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  disabled?: boolean;
}

const ApproveRejectButtons: React.FC<ApproveRejectButtonsProps> = ({ onApprove, onReject, disabled = false }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onApprove}
        disabled={disabled}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded"
      >
        Approve
      </button>
      <button
        onClick={onReject}
        disabled={disabled}
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
    </div>
  );
};

export default ApproveRejectButtons;
// Placeholder for ApproveRejectButtons.tsx