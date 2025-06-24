// src/pages/index.tsx
import Head from "next/head";
import VIPCard from "@/components/VIPCard";
import { VIP_TIERS } from "@/constants/vipTiers";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChainYield – Earn Daily Interest with VIP Tiers</title>
        <meta
          name="description"
          content="Deposit USDC and earn up to 2.7% daily with ChainYield's VIP system."
        />
      </Head>

      <div className="bg-black min-h-screen text-white">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            Earn Up to <span className="text-yellow-400">2.7% Daily</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Deposit USDC and automatically unlock VIP tiers for higher returns.
            Withdraw interest anytime. No lockups.
          </p>
          <a
            href="/deposit"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            Start Earning
          </a>
        </section>

        {/* VIP Cards */}
        <section className="py-10 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">VIP Yield Tiers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIP_TIERS.map((tier) => (
              <VIPCard key={tier.tierIndex} {...tier} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}


