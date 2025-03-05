"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import dynamic from "next/dynamic";
import Techtacks from "@/app/block/Techtacks";

const MyProject = dynamic(() => import("./block/MyProject"));
const Services = dynamic(() => import("./block/Services"));
const Contact = dynamic(() => import("./block/Contact"));
const Footer = dynamic(() => import("./block/Footer"));
const Testblock = dynamic(() => import("./block/testblock"));
const DownloadApp = dynamic(() => import("./templates/Downloadapp.jsx"));

export default function Home() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (scrollDirection === "down") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="w-full h-full pt-[20px] bg-black">
      <main className="container flex flex-col justify-center">
        {isLoading ? (
          <div className="w-[450px] sm:w-[450px] h-[250px] bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <Image
            className=""
            src="/LOGO.png"
            alt="davelogo"
            width={450}
            height={38}
            priority
          />
        )}

        <ol className="list-inside text-sm px-[10px] sm:px-[20px] text-center sm:text-left font-[family-name:var(--font-geist-mono)] min-h-[150px]">
          <li className="mb-4 sm:mb-2">
            <span className="text-blue-500 text-[18px] sm:text-[20px] md:text-[40px] lg:text-3xl">
              {isLoading ? (
                <div className="w-[150px] sm:w-[200px] h-[20px] sm:h-[30px] bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <Typewriter
                  words={["Hi, I'm Dave"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                />
              )}
            </span>

            <div className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-2xl text-white mt-2 sm:mt-4">
              a passionate web developer specializing in crafting dynamic and
              responsive websites using modern frameworks like Vue.js, Next.js,
              and Express.js. With expertise in integrating CMS platforms and
              creating user-friendly interfaces, I build efficient and scalable
              solutions to bring ideas to life.
            </div>
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row pt-[45px] px-[25px]">
          <Link
            href="#"
            className="rounded-full border border-solid border-white transition-colors flex items-center justify-center text-white gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              alt="Vercel logomark"
              src="/LOGO.png"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
            DOWNLOAD CV
          </Link>

          <Link
            href="#"
            onClick={scrollToProjects}
            className="relative overflow-hidden rounded-full border border-solid bg-white text-black border-black/[.08] dark:border-white/[.145] transition-all duration-500 ease-out flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 group"
          >
            <span className="relative z-10">MY PROJECTS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#64a393] via-[#8ACEBE] to-[#2A9D8F] dark:from-[#2A9D8F] dark:to-[#dafff6] transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
          </Link>
        </div>

        <div className="flex gap-2 pt-[20px] px-[70px] justify-center sm:justify-start ">
          <Link href="#" className="h-[40px] w-[40px]">
            <Image
              className="rounded-lg cursor-pointer h-[39px] w-[39px] object-fill"
              src="/Github.png"
              alt="Github"
              width={35}
              height={30}
              priority
            />
          </Link>

          <Image
            className="rounded-lg cursor-pointer h-[38px] w-[38px] object-fill"
            src="/Linkin.png"
            alt="LinkedIn"
            width={35}
            height={30}
            priority
          />
          <Image
            className="rounded-lg cursor-pointer h-[38px] w-[38px] object-fill"
            src="/Facebook.png"
            alt="Facebook"
            width={35}
            height={30}
            priority
          />
        </div>
        <Techtacks />
        <Testblock contactRef={contactRef} />

        <div className="pt-[150px] h-full text-white scroll-smooth slide-top view">
          <div className="blocked" ref={projectsRef}>
            <h1 className="font-bold text-2xl px-[35px] ">PROJECTS</h1>
            <MyProject />
          </div>
          <div className="blocked">
            <h1 className="font-bold text-2xl px-[35px] ">SERVICES</h1>
            <Services />
          </div>
          <div className="blocked" ref={contactRef}>
            <h1 className="font-bold text-2xl px-[35px] mt-20">CONTACT</h1>
            <Contact />
          </div>
        </div>
      </main>

      <DownloadApp />
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="fixed bottom-4 z-[100] right-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 text-3xl border-4 border-white hover:border-sky-500 transition-all duration-300"
          aria-label={`Scroll ${scrollDirection}`}
        >
          {scrollDirection === "down" ? "⬇" : "⬆"}
        </button>
      )}
      <Footer />
    </div>
  );
}
