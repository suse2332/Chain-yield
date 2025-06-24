// src/app/tiers/page.tsx
"use client";

import React from "react";
import { vipTiers } from "@/constants/vipTiers";
import VIPCard from "@/components/VIP/VIPCard";

export default function TiersPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-10">
        VIP Tiers Overview
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {vipTiers.map((tier) => (
          <VIPCard
            key={tier.name}
            name={tier.name}
            interest={tier.rate}
            icon={tier.icon}
            description={tier.description}
            onDepositClick={() => {
              alert(`Start deposit for ${tier.name}`);
            }}
          />
        ))}
      </section>
    </main>
  );
}

