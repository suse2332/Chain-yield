"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCountdownToNextPayout } from "@/hooks/useCountdownToNextPayout";

interface VIPCardProps {
  name: string;
  interest: string;
  icon: string;
  description?: string;
  isCurrentUserTier?: boolean;
}

export default function VIPCard({
  name,
  interest,
  icon,
  description,
  isCurrentUserTier = false,
}: VIPCardProps) {
  const router = useRouter();
  const { formatted } = useCountdownToNextPayout();

  return (
    <div
      className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl shadow-lg border ${
        isCurrentUserTier ? "border-purple-500 animate-pulse" : "border-gray-700"
      } p-6 flex flex-col items-center text-center max-w-xs mx-auto transition duration-300`}
    >
      {isCurrentUserTier && (
        <div className="absolute top-2 right-2 text-xs text-purple-400 font-bold bg-purple-900/20 border border-purple-600 px-2 py-1 rounded-full shadow-sm">
          🔥 Your Tier
        </div>
      )}

      <div className="w-24 h-24 relative mb-4">
        <Image
          src={icon}
          alt={`${name} VIP icon`}
          fill
          style={{ objectFit: "contain" }}
          priority
          draggable={false}
        />
      </div>

      <h3 className="text-2xl font-extrabold text-white mb-1 tracking-wide">{name}</h3>

      {description && (
        <p className="text-sm text-gray-400 mb-2 max-w-[90%]">{description}</p>
      )}

      <p className="text-md text-indigo-400 font-semibold mb-1">
        Daily Interest: <span className="text-indigo-500">{interest}</span>
      </p>

      <p className="text-sm text-gray-400 mb-6">Next Payout: {formatted}</p>

      <button
        onClick={() => router.push("/deposit")}
        className="mt-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors rounded-full px-6 py-2 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`Deposit for ${name} tier`}
      >
        Deposit
      </button>
    </div>
  );
}
