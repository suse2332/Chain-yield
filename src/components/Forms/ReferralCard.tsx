import React, { useState } from "react";

interface ReferralCardProps {
  referralLink: string;
  totalReferrals: number;
  referralBonus: number; // e.g. in USDC
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referralLink, totalReferrals, referralBonus }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-md text-white max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Your Referral Link</h3>
      <div className="flex items-center mb-4">
        <input
          type="text"
          readOnly
          value={referralLink}
          className="flex-grow p-2 rounded-l-md bg-gray-800 border border-gray-700 text-sm text-white select-all"
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          onClick={handleCopy}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md text-white font-semibold transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <p>Total Referrals: <span className="text-white">{totalReferrals}</span></p>
        <p>Referral Bonus: <span className="text-white">{referralBonus.toFixed(2)} USDC</span></p>
      </div>
    </div>
  );
};

export default ReferralCard;
