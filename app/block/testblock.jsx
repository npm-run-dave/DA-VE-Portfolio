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
    <div className="flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
      <div
        className="transition-all ease-out"
        style={{
          transform: `translateX(-${linePosition}px)`,
          opacity: lineOpacity,
        }}
      >
        <Image src="/Line.jpg" width={300} height={20} alt="line" />
      </div>
      <div className="relative">
        <div
          className="transition-all ease-out"
          style={{
            transform: `rotate(${rotate}deg)`,
            opacity: spinnerOpacity,
          }}
        >
          <Image src="/spiner.jpg" height={400} width={400} alt="spinner" />
        </div>
        <div className="absolute transition-all duration-700 hover:filter hover:brightness-150 cursor-pointer top-[110px] left-[102px]  ">
          <div className="w-full h-auto relative">
            <Image
              src="/Rectangle.jpg"
              width={200}
              height={150}
              alt="thumbnail"
              className="transition-all duration-700  object-cover"
            />
            <h2 className="absolute top-[25px] text-[13px] left-[55px] text-white font-bold">
              GET IN TOUCH
            </h2>
          </div>
        </div>
      </div>

      <div
        className="transition-all ease-out"
        style={{
          transform: `translateX(${linePosition}px)`,
          opacity: lineOpacity,
        }}
      >
        <Image src="/Line.jpg" width={300} height={20} alt="line" />
      </div>
    </div>
  );
}
