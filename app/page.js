"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Typewriter } from "react-simple-typewriter";
import Footer from "./block/Footer";

const MyProject = dynamic(() => import("./block/MyProject"), { ssr: false });
const Services = dynamic(() => import("./block/Services"), { ssr: false });
const Contact = dynamic(() => import("./block/Contact"), { ssr: false });

export default function Home() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollDirection("up");
        setShowScrollButton(true);
      } else {
        setScrollDirection("down");
        setShowScrollButton(false);
      }
    };

    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  const handleScroll = () => {
    if (scrollDirection === "down") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full pt-[20px]">
      <main className="container">
        <Image
          src="/LOGO.png"
          alt="davelogo"
          width={450}
          height={38}
          priority
        />

        <ol className="list-inside text-sm px-[20px] text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <span className="text-blue-500 text-3xl">
              <Typewriter
                words={["Hi, I'm Dave"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={70}
              />
            </span>
            <span className="text-2xl">
              , a passionate web developer specializing in crafting dynamic and
              responsive websites using modern frameworks like Vue.js, Next.js,
              and Express.js. With expertise in integrating CMS platforms and
              creating user-friendly interfaces, I build efficient and scalable
              solutions to bring ideas to life.
            </span>
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-white transition-colors flex items-center justify-center text-white gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
          >
            <Image src="/LOGO.png" alt="CV Download" width={40} height={40} />
            DOWNLOAD CV
          </a>
          <a
            className="relative overflow-hidden rounded-full border border-solid bg-white text-black border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 group"
            href="#"
          >
            <span className="relative z-10">MY PROJECTS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#64a393] via-[#8ACEBE] to-[#2A9D8F] dark:from-[#2A9D8F] dark:to-[#dafff6] transition-transform transform translate-x-full group-hover:translate-x-0"></span>
          </a>
        </div>

        <div className="flex gap-2 mt-4">
          <Image
            src="/Github.png"
            alt="Github"
            width={35}
            height={30}
            loading="lazy"
          />
          <Image
            src="/Linkin.png"
            alt="LinkedIn"
            width={35}
            height={30}
            loading="lazy"
          />
          <Image
            src="/Facebook.png"
            alt="Facebook"
            width={35}
            height={30}
            loading="lazy"
          />
        </div>

        <div className="mt-40 h-full">
          <h1 className="font-bold text-2xl translate-x-10">PROJECTS</h1>
          <div className="mt-20">
            <MyProject />
          </div>
          <div>
            <h1 className="font-bold text-2xl translate-x-10 mb-20">
              SERVICES
            </h1>
            <Services />
          </div>
          <div>
            <h1 className="font-bold text-2xl translate-x-10 mt-20">CONTACT</h1>
            <Contact />
          </div>
        </div>
      </main>

      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="fixed bottom-4 right-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 text-3xl border-4 border-white hover:border-sky-500 transition-all duration-300"
          aria-label={`Scroll ${scrollDirection}`}
        >
          {scrollDirection === "down" ? "⬇" : "⬆"}
        </button>
      )}

      <Footer />
    </div>
  );
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
