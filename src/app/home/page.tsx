"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import VIPCard from "@/components/VIP/VIPCard";
import { vipTiers } from "@/constants/vipTiers";
import HeroCarousel from "@/components/HeroCarousel";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const logoSrc =
    theme === "light"
      ? "/images/logos/logo-light.png"
      : "/images/logos/logo-dark.png";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <Link href="/" legacyBehavior>
          <a className="flex items-center">
            <Image
              src={logoSrc}
              alt="ChainYield Logo"
              width={140}
              height={36}
              priority
              className="object-contain"
            />
          </a>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/" legacyBehavior><a className="text-purple-400 hover:underline">Home</a></Link>
          <Link href="/about" legacyBehavior><a className="hover:text-purple-400">About</a></Link>
          <Link href="/deposit" legacyBehavior><a className="hover:text-purple-400">Deposit</a></Link>
          <Link href="/tiers" legacyBehavior><a className="hover:text-purple-400">Tiers</a></Link>
          <Link href="/dashboard" legacyBehavior><a className="hover:text-purple-400">Dashboard</a></Link>
        </nav>

        <Button className="bg-purple-600 text-white hover:bg-purple-500 hidden md:block">
          Reconnect Wallet
        </Button>

        <button
          className="md:hidden text-purple-400 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-black border-b border-gray-800 px-6 py-4 flex flex-col gap-4 text-white text-lg">
          <Link href="/" legacyBehavior><a onClick={() => setMobileMenuOpen(false)}>Home</a></Link>
          <Link href="/about" legacyBehavior><a onClick={() => setMobileMenuOpen(false)}>About</a></Link>
          <Link href="/deposit" legacyBehavior><a onClick={() => setMobileMenuOpen(false)}>Deposit</a></Link>
          <Link href="/tiers" legacyBehavior><a onClick={() => setMobileMenuOpen(false)}>Tiers</a></Link>
          <Link href="/dashboard" legacyBehavior><a onClick={() => setMobileMenuOpen(false)}>Dashboard</a></Link>
          <Button className="bg-purple-600 text-white hover:bg-purple-500 mt-2" onClick={() => setMobileMenuOpen(false)}>
            Reconnect Wallet
          </Button>
        </nav>
      )}

      {/* Hero Carousel Section */}
      <section className="px-4 pt-6 max-w-7xl mx-auto">
        <HeroCarousel />
      </section>

      {/* VIP Tier Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 mt-10 max-w-7xl mx-auto">
        {vipTiers.map((tier) => (
          <VIPCard
            key={tier.name}
            name={tier.name}
            interest={tier.interest}
            icon={tier.icon}
            onDepositClick={() => {
              alert(`Deposit clicked for ${tier.name}`);
            }}
          />
        ))}
      </section>

      {/* Partner Logos */}
      <section className="mt-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-gray-400 mb-6">
          Our Partners
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <Image src="/images/logos/partner1.png" alt="Partner 1" width={100} height={40} />
          <Image src="/images/logos/partner2.png" alt="Partner 2" width={100} height={40} />
          <Image src="/images/logos/partner3.png" alt="Partner 3" width={100} height={40} />
          <Image src="/images/logos/partner4.png" alt="Partner 4" width={100} height={40} />
        </div>
      </section>
    </main>
  );
}

