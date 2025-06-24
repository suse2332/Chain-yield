// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "Deposit", path: "/deposit", icon: "💰" },
  { label: "My Account", path: "/account", icon: "👤" },
  { label: "VIP Levels", path: "/tiers", icon: "💎" },
  { label: "NFT", path: "/nft", icon: "🖼️" },
  { label: "Pool Data", path: "/pool", icon: "📊" },
  { label: "Loan", path: "/loan", icon: "🏦" },
  { label: "Paper", path: "/paper", icon: "📄" },
  { label: "Support", path: "/support", icon: "🚰" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { walletAddress, disconnect } = useWallet();

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="text-2xl font-bold tracking-wide text-white">ChainYield</div>

      <nav className="hidden md:flex gap-6 items-center text-sm">
        {navItems.map(({ label, path, icon }) => (
          <Link
            key={path}
            href={path}
            className="text-gray-300 hover:text-purple-400 transition"
          >
            {icon} {label}
          </Link>
        ))}
        {walletAddress && (
          <span className="text-green-400 text-xs ml-4">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        )}
      </nav>

      <div className="md:hidden">
        <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md p-6 z-50 md:hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">Menu</div>
            <Button variant="ghost" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </Button>
          </div>

          <div className="flex flex-col gap-4 text-lg">
            {navItems.map(({ label, path, icon }) => (
              <Link
                key={path}
                href={path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-purple-400 transition"
              >
                {icon} {label}
              </Link>
            ))}

            {walletAddress && (
              <>
                <div className="mt-6 text-sm text-gray-400">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
                <Button
                  variant="outline"
                  className="mt-2 text-sm"
                  onClick={disconnect}
                >
                  Disconnect Wallet
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
