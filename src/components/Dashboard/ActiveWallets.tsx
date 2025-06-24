// File: src/components/Dashboard/ActiveWallets.tsx
import React from "react";

interface WalletActivity {
  address: string;
  activity: "deposited" | "withdrew";
  timeAgo: string;
}

const wallets: WalletActivity[] = [
  { address: "0x12ab34cd56ef7890abcd1234ef567890abcd1234", activity: "deposited", timeAgo: "2 minutes ago" },
  { address: "0x98bc76de54fa3210abcd9876ef543210dcba9876", activity: "withdrew", timeAgo: "5 minutes ago" },
  { address: "0x7a9f1234b56789cdabcdeffedcba9876543210ab", activity: "deposited", timeAgo: "10 minutes ago" },
  { address: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d", activity: "deposited", timeAgo: "12 minutes ago" },
  { address: "0xa1b2c3d4e5f60718293a4b5c6d7e8f9012345678", activity: "withdrew", timeAgo: "15 minutes ago" },
  { address: "0xabcdef1234567890abcdef1234567890abcdef12", activity: "deposited", timeAgo: "18 minutes ago" },
  { address: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", activity: "deposited", timeAgo: "20 minutes ago" },
  { address: "0xcafebabecafebabecafebabecafebabecafebabe", activity: "withdrew", timeAgo: "22 minutes ago" },
  { address: "0xfeedfacefeedfacefeedfacefeedfacefeedface", activity: "deposited", timeAgo: "25 minutes ago" },
  { address: "0x1234567890abcdef1234567890abcdef12345678", activity: "withdrew", timeAgo: "27 minutes ago" },
  { address: "0x87654321fedcba987654321fedcba987654321fe", activity: "deposited", timeAgo: "30 minutes ago" },
  { address: "0x0badc0de0badc0de0badc0de0badc0de0badc0de", activity: "deposited", timeAgo: "33 minutes ago" },
  { address: "0xbaadf00dbaadf00dbaadf00dbaadf00dbaadf00d", activity: "withdrew", timeAgo: "35 minutes ago" },
  { address: "0xdeadbabe1234deadbabe1234deadbabe1234dead", activity: "deposited", timeAgo: "37 minutes ago" },
  { address: "0xbeefdeadbeefdeadbeefdeadbeefdeadbeefdead", activity: "deposited", timeAgo: "40 minutes ago" },
  { address: "0xfeedbeadfeedbeadfeedbeadfeedbeadfeedbead", activity: "withdrew", timeAgo: "43 minutes ago" },
  { address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", activity: "deposited", timeAgo: "45 minutes ago" },
  { address: "0x1234123412341234123412341234123412341234", activity: "withdrew", timeAgo: "48 minutes ago" },
  { address: "0x4321432143214321432143214321432143214321", activity: "deposited", timeAgo: "50 minutes ago" },
  { address: "0x0a0b0c0d0e0f1011121314151617181920212223", activity: "deposited", timeAgo: "55 minutes ago" },
];

const maskAddress = (addr: string) => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const ActiveWallets: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">Recent Wallet Activity</h2>
      <ul className="space-y-3">
        {wallets.map(({ address, activity, timeAgo }, i) => (
          <li
            key={i}
            className={`flex justify-between items-center p-3 rounded-md ${
              activity === "deposited" ? "bg-green-800" : "bg-red-800"
            }`}
          >
            <span className="text-white font-mono">{maskAddress(address)}</span>
            <span className="text-gray-300 capitalize">{activity}</span>
            <span className="text-gray-400 text-sm">{timeAgo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveWallets;
