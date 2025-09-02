"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";

// Direct imports instead of dynamic
import Techtacks from "./block/Techtacks";
import MyProject from "./block/MyProject";
import Services from "./block/Services";
import Contact from "./block/Contact";
import Footer from "./block/Footer";
import DownloadApp from "./templates/Downloadapp";
import Experience from "./block/Experience";

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="relative">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <Image
        src="/LOGO.png"
        alt="Loading"
        width={80}
        height={80}
        className="absolute inset-0 m-auto"
        priority
      />
    </div>
  </div>
);

export default function Home() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
        setScrollDirection("up");
      }

      // Show/hide button
      setShowScrollButton(currentScrollY > 300);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (scrollDirection === "down") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollContact = (e) => {
    e.preventDefault();
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full h-full pt-[20px] bg-black">
      {isLoading && <LoadingScreen />}

      <main className="container flex flex-col justify-center">
        <div
          className={`transition-opacity duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Logo */}
          <Image
            className="mx-auto sm:mx-0"
            src="/LOGO.png"
            alt="davelogo"
            width={450}
            height={38}
            priority
          />

          {/* Intro */}
          <ol className="list-inside text-sm px-[10px] sm:px-[55px] text-center sm:text-left font-[family-name:var(--font-geist-mono)] min-h-[150px]">
            <li className="mb-4 sm:mb-2">
              <span className="text-blue-500 text-[18px] sm:text-[20px] md:text-[40px] lg:text-3xl">
                <Typewriter
                  words={["Hi, I'm Dave"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                />
              </span>
              <div className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-2xl text-white mt-2 sm:mt-4">
                a passionate web developer specializing in crafting dynamic and
                responsive websites using modern frameworks like Vue.js,
                Next.js, and Express.js. With expertise in integrating CMS
                platforms and creating user-friendly interfaces, I build
                efficient and scalable solutions to bring ideas to life.
              </div>
            </li>
          </ol>

          {/* Buttons */}
          <div className="flex gap-4 items-center flex-col sm:flex-row pt-[45px] px-[25px] sm:px-[55px]">
            <Link
              href="#"
              className="rounded-full border border-solid border-white transition-colors flex items-center justify-center text-white gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-white/10"
            >
              <Image
                alt="cv"
                src="/LOGO.png"
                width={20}
                height={20}
                loading="lazy"
              />
              DOWNLOAD CV
            </Link>

            <Link
              href="#projects"
              onClick={scrollToProjects}
              className="relative overflow-hidden rounded-full border border-solid bg-white text-black border-black/[.08] dark:border-white/[.145] transition-all duration-500 ease-out flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 group"
            >
              <span className="relative z-10">MY PROJECTS</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#64a393] via-[#8ACEBE] to-[#2A9D8F] dark:from-[#2A9D8F] dark:to-[#dafff6] transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
            </Link>
          </div>

          {/* Social links */}
          <div className="flex gap-2 pt-[20px] px-[70px] justify-center sm:justify-start sm:px-[55px] sm:pt-[35px]">
            <Link href="#" className="h-[40px] w-[40px] hover:scale-110">
              <Image
                className="rounded-lg cursor-pointer object-fill"
                src="/Github.png"
                alt="Github"
                width={39}
                height={39}
                loading="lazy"
              />
            </Link>
            <Link href="#" className="h-[40px] w-[40px] hover:scale-110">
              <Image
                className="rounded-lg cursor-pointer object-fill"
                src="/Linkin.png"
                alt="LinkedIn"
                width={38}
                height={38}
                loading="lazy"
              />
            </Link>
            <Link href="#" className="h-[40px] w-[40px] hover:scale-110">
              <Image
                className="rounded-lg cursor-pointer object-fill"
                src="/Facebook.png"
                alt="Facebook"
                width={38}
                height={38}
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        {/* Tech stack */}
        <Techtacks />

        {/* Sections */}
        <div className="pt-[150px] h-full text-white scroll-smooth">
          <div className="blocked" ref={projectsRef} id="projects">
            <h1 className="font-bold text-2xl px-[35px]">PROJECTS</h1>
            <MyProject />
          </div>

          <div className="blocked">
            <Services />
          </div>

          <div className="blocked">
            <Experience />
          </div>

          <div className="blocked" ref={contactRef}>
            <h1 className="font-bold text-2xl px-[35px] mt-20">CONTACT</h1>
            <Contact />
          </div>
        </div>
      </main>

      <DownloadApp />

      {/* Scroll button */}
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="fixed bottom-6 z-[100] right-6 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 text-3xl border-4 border-white hover:border-sky-500 transition-all duration-300 backdrop-blur-sm"
          aria-label={`Scroll ${scrollDirection}`}
        >
          {scrollDirection === "down" ? "⬇" : "⬆"}
        </button>
      )}

      <Footer />
    </div>
  );
}
