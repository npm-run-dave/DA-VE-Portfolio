"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Block({ contactRef }) {
  const [rotate, setRotate] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);
  const [spinnerOpacity, setSpinnerOpacity] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0);

  const handleGetInTouchClick = () => {
    if (contactRef && contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setRotate(scrollY * 0.8);

      let scrollFactor = scrollY / 3;

      const maxPosition = window.innerWidth - 300;

      if (scrollFactor > 90) {
        scrollFactor = 90;
      }

      const constrainedPosition = Math.max(
        0,
        Math.min(scrollFactor, maxPosition)
      );

      if (screenWidth < 640) {
        setLinePosition(0);
      } else {
        setLinePosition(constrainedPosition);
      }

      const opacity = Math.max(1 - scrollY / 300, 0);
      setLineOpacity(opacity);

      const spinnerOpacityValue = Math.max(1 - scrollY / 500, 0);
      setSpinnerOpacity(spinnerOpacityValue);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [screenWidth]);

  return (
    <div className="flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ">
      <div
        className="transition-all ease-out"
        style={{
          transform: `translateX(-${linePosition}px)`,
          opacity: lineOpacity,
        }}
      >
        <Image
          src="/Line.jpg"
          width={300}
          height={20}
          alt="line"
          className=""
        />
      </div>

      <div className="relative">
        <div
          className="transition-all ease-out"
          style={{
            transform: `rotate(${rotate}deg)`,
            opacity: spinnerOpacity,
          }}
        >
          <Image
            src="/spiner.jpg"
            height={200}
            width={400}
            alt="spinner"
            className="w-[300px] sm:w-[400px]"
          />
        </div>
        <div className="absolute transition-all duration-700 hover:filter hover:brightness-150 cursor-pointer top-[75px] sm:top-[110px] left-[45px] sm:left-[102px]  ">
          <div className="w-full h-auto relative">
            <Image
              src="/Rectangle.jpg"
              width={200}
              height={150}
              alt="thumbnail"
              className="transition-all duration-700  object-cover"
            />
            <h2
              className="absolute top-[25px] text-[13px] left-[55px] text-white font-bold"
              onClick={handleGetInTouchClick}
            >
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
        <Image
          src="/Line.jpg"
          width={300}
          height={20}
          alt="line"
          className=""
        />
      </div>
    </div>
  );
}
