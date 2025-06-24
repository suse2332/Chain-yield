// src/pages/about.tsx or app/about/page.tsx
"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About USDC and ChainYield</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What is USDC (USD Coin)?</h2>
        <p className="mb-4 text-gray-300 leading-relaxed text-lg">
          <strong>USDC (USD Coin)</strong> is a widely trusted, fully regulated{" "}
          <strong>U.S. dollar-backed stablecoin</strong> that combines the{" "}
          <strong>security and stability of fiat currency</strong> with the{" "}
          <strong>speed and transparency of blockchain technology</strong>. Issued
          by <strong>Circle</strong> and governed by the <strong>Centre Consortium</strong>, USDC maintains
          a strict 1:1 peg with the U.S. dollar, backed by fully audited dollar reserves
          held in regulated financial institutions. Monthly attestation reports from
          leading auditing firms provide ongoing transparency and trust.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          As a multi-chain digital dollar, USDC powers a broad range of decentralized
          finance (DeFi) applications, payment systems, and digital marketplaces globally.
          Its <strong>stability, liquidity, and ease of use</strong> make it the ideal
          foundation for secure and reliable fixed-income products.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Introducing ChainYield</h2>
        <p className="mb-4 text-gray-300 leading-relaxed text-lg">
          <strong>ChainYield</strong> is a next-generation, USDC-backed fixed-interest
          protocol designed to offer secure, transparent, and competitive yields on
          your stablecoin deposits.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Our platform is simple yet powerful: deposit your USDC, receive an automatic
          VIP tier based on your deposit amount, and earn fixed daily interest rates
          that increase as you move up the tiers—from Iron all the way to Black Diamond.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why ChainYield?</h2>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-3">
          <li>
            <strong>USDC-backed Stability:</strong> Grow your funds with a currency
            fully backed by real U.S. dollars, ensuring minimal volatility.
          </li>
          <li>
            <strong>Security-first Design:</strong> Wallet-based access with off-chain
            interest calculations and human-monitored withdrawal requests to maximize
            safety.
          </li>
          <li>
            <strong>Fast, Transparent Withdrawals:</strong> Submit withdrawal requests
            securely, with owner approval and notifications to keep you informed.
          </li>
          <li>
            <strong>Tiered VIP System:</strong> Rewarding commitment with better yields
            — deposit more USDC to unlock higher fixed interest rates, from 0.7% up to
            2.7% daily.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Empowering DeFi with Transparency</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          ChainYield bridges the gap between traditional savings and decentralized finance
          by combining <strong>USDC’s reliability</strong> with blockchain’s openness and
          accessibility.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Whether you're a crypto newcomer seeking low-risk yield, or an experienced
          investor looking for dependable stablecoin income, ChainYield delivers a modern,
          transparent savings solution tailored for the decentralized future.
        </p>
      </section>
    </div>
  );
}
