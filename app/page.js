"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import MyProject from "./block/MyProject";
import Services from "./block/Services";
import Contact from "./block/Contact";
import Footer from "./block/Footer";
import Link from "next/link";

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

  return (
    <div className="w-full h-full pt-[20px] bg-black">
      <main className="container flex flex-col justify-center ">
        <Image
          className=""
          src="/LOGO.png"
          alt="davelogo"
          width={450}
          height={38}
        />
        <ol className="list-inside text-sm px-[20px] text-center  sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <span className="text-blue-500 text-[20px] md:text-[40px] lg:text-3xl">
              <Typewriter
                words={["Hi, I'm Dave"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={70}
              />
            </span>
            <span className="text-[15px] md:text-[20px] lg:text-2xl text-white ">
              , a passionate web developer specializing in crafting dynamic and
              responsive websites using modern frameworks like Vue.js, Next.js,
              and Express.js. With expertise in integrating CMS platforms and
              creating user-friendly interfaces, I build efficient and scalable
              solutions to bring ideas to life.
            </span>
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row pt-[45px]">
          <Link
            href="#"
            className="rounded-full border border-solid border-white transition-colors flex items-center justify-center  text-white gap-2  text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className=""
              src="/LOGO.png"
              alt="Vercel logomark"
              width={40}
              height={40}
            />
            DOWNLOAD CV
          </Link>
          <Link
            href="#"
            className="relative overflow-hidden rounded-full border border-solid bg-white text-black border-black/[.08] dark:border-white/[.145] transition-all duration-500 ease-out flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 group"
          >
            <span className="relative z-10">MY PROJECTS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#64a393] via-[#8ACEBE] to-[#2A9D8F] dark:from-[#2A9D8F] dark:to-[#dafff6] transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
          </Link>
        </div>
        <div className="flex gap-2 pt-[20px] px-[25px]  justify-center sm:justify-start ">
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
        <div className=" pt-[50px] h-full text-white">
          <h1 className="font-bold text-2xl px-[25px] ">PROJECTS</h1>
          <div className="pt-[30px]">
            <MyProject />
          </div>
          <div>
            <h1 className="font-bold text-2xl px-[25px] mb-20">SERVICES</h1>
            <Services />
          </div>
          <div>
            <h1 className="font-bold text-2xl px-[25px] mt-20">CONTACT</h1>
            <Contact />
          </div>
        </div>
      </main>
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="fixed bottom-4 right-4 p-3 bg-gray-700 text-white  rounded-full shadow-lg hover:bg-gray-600 text-3xl border-4 border-white hover:border-sky-500 transition-all duration-300"
          aria-label={`Scroll ${scrollDirection}`}
        >
          {scrollDirection === "down" ? "⬇" : "⬆"}
        </button>
      )}

      <Footer />
    </div>
  );
}
