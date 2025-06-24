"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/hero/hero1.jpg",
  "/images/hero/hero2.jpg",
  "/images/hero/hero3.png",
  "/images/hero/hero4.png",
  "/images/hero/hero5.png",
  "/images/hero/hero6.png",
];


export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5-second slide

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
      <Image
        key={images[index]}
        src={images[index]}
        alt={`Hero image ${index + 1}`}
        fill
        style={{ objectFit: "cover" }}
        priority
        draggable={false}
      />
      <div className="absolute bottom-6 left-6 bg-black/60 text-white text-sm px-4 py-1 rounded-lg">
        Slide {index + 1} of {images.length}
      </div>
    </div>
  );
}
