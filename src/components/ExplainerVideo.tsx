// src/components/ExplainerVideo.tsx
import React from "react";

const ExplainerVideo = () => {
  return (
    <section className="bg-gray-950 py-12 px-4 sm:px-8 lg:px-16 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        How to Send USDC from Coinbase to Coinbase Wallet
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Quick and easy guide to fund your ChainYield deposit in under 2 minutes.
      </p>
      <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/B5RNbJNOq_0"
          title="How To Send USDC From Coinbase To Coinbase Wallet"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default ExplainerVideo;
