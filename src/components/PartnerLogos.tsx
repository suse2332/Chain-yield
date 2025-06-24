import React from "react";
import Image from "next/image";

const PartnerLogos = () => {
  return (
    <section className="w-full bg-gray-950 py-8 px-4 sm:px-8 lg:px-16 overflow-x-auto">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold text-white mb-4">
        Our Trusted Partners
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl overflow-hidden rounded-xl shadow-lg">
          <Image
            src="https://ik.imagekit.io/rmlbayysp/1750531363273-mobile.c69b4be7_DcHCnOLhG.jpg"
            alt="Partner Logos"
            width={1600}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
