"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Block() {
  const [rotate, setRotate] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);
  const [spinnerOpacity, setSpinnerOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setRotate(scrollY * 0.8);

      const scrollFactor = scrollY / 3;
      setLinePosition(scrollFactor);

      const opacity = Math.max(1 - scrollY / 300, 0);
      setLineOpacity(opacity);

      const spinnerOpacityValue = Math.max(1 - scrollY / 500, 0);
      setSpinnerOpacity(spinnerOpacityValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        style={{
          transform: `translateX(-${linePosition}px)`,
          opacity: lineOpacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
      >
        <Image src="/Line.jpg" width={300} height={20} alt="line" />
      </div>

      <div
        style={{
          transform: `rotate(${rotate}deg)`,
          opacity: spinnerOpacity,
          transition:
            "transform 0.05s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s ease-out",
        }}
      >
        <Image src="/spiner.jpg" height={400} width={400} alt="imagespiner" />
      </div>

      <div
        style={{
          transform: `translateX(${linePosition}px)`,
          opacity: lineOpacity,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
      >
        <Image src="/Line.jpg" width={300} height={20} alt="line" />
      </div>
    </div>
  );
}
