import { Gem } from "lucide-react";

const vipTiers = [
  { name: "Iron", min: 100, max: 9999, rate: "0.7%", color: "gray" },
  { name: "Bronze", min: 10000, max: 99999, rate: "0.9%", color: "amber" },
  { name: "Silver", min: 100000, max: 299999, rate: "1.1%", color: "slate" },
  { name: "Gold", min: 300000, max: 499999, rate: "1.3%", color: "yellow" },
  { name: "Platinum", min: 500000, max: 999999, rate: "1.5%", color: "cyan" },
  { name: "Black Gold", min: 1000000, max: 2999999, rate: "1.7%", color: "orange" },
  { name: "Diamond", min: 3000000, max: 4999999, rate: "1.98%", color: "blue" },
  { name: "Black Diamond", min: 5000000, max: Infinity, rate: "2.7%", color: "purple" },
];

export default function VIPTierTable() {
  return (
    <div className="overflow-x-auto border border-gray-700 rounded-2xl mt-6">
      <table className="min-w-full text-sm text-gray-300">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">Tier</th>
            <th className="px-4 py-3 text-left">Deposit Range (USDC)</th>
            <th className="px-4 py-3 text-left">Daily Interest Rate</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {vipTiers.map((tier) => (
            <tr key={tier.name}>
              <td className="px-4 py-3 flex items-center gap-2">
                <Gem className={`text-${tier.color}-500 w-4 h-4`} />
                <span>{tier.name}</span>
              </td>
              <td className="px-4 py-3">
                {tier.max === Infinity
                  ? `≥ ${tier.min.toLocaleString()}`
                  : `${tier.min.toLocaleString()} – ${tier.max.toLocaleString()}`}
              </td>
              <td className="px-4 py-3">{tier.rate} per day</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
