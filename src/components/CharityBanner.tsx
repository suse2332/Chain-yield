// src/components/CharityBanner.tsx
export const CharityBanner = () => (
  <div className="bg-gradient-to-r from-purple-900 to-black text-white py-4 px-6 text-center rounded-xl my-6 shadow-lg">
    🌍 We match 1% of profits to verified global charities. Your yield creates real-world impact.
  </div>
);

// src/components/VIPPreview.tsx
import Image from "next/image";
import { VIP_TIERS } from "@/constants/vipTiers";

export const VIPPreview = () => (
  <div className="overflow-x-auto flex gap-4 px-6 py-8">
    {VIP_TIERS.slice(0, 4).map((tier) => (
      <div key={tier.tierIndex} className="min-w-[250px] bg-gray-900 rounded-xl p-4 shadow-md">
        <Image src={tier.icon} alt={tier.tierName} width={40} height={40} />
        <h3 className="text-white font-bold mt-2">{tier.tierName}</h3>
        <p className="text-yellow-400 text-sm">{tier.dailyInterest}% daily</p>
      </div>
    ))}
  </div>
);

}
