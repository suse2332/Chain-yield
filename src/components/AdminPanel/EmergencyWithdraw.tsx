import React, { useState } from "react";

interface EmergencyWithdrawProps {
  onEmergencyWithdraw: () => void;
  disabled?: boolean;
}

const EmergencyWithdraw: React.FC<EmergencyWithdrawProps> = ({ onEmergencyWithdraw, disabled = false }) => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 5000);
    } else {
      onEmergencyWithdraw();
      setConfirming(false);
    }
  };

  return (
    <button
      onClick={handleConfirm}
      disabled={disabled}
      className={`px-4 py-2 rounded font-bold text-white ${
        confirming ? "bg-red-800" : "bg-red-600 hover:bg-red-700"
      } transition`}
      title="Emergency withdraw clears contract balance"
    >
      {confirming ? "Click again to confirm!" : "Emergency Withdraw"}
    </button>
  );
};

export default EmergencyWithdraw;
// Placeholder for EmergencyWithdraw.tsx