"use client";
import { useState } from "react";
import myproject from "@/Static/myproject.json";
import Image from "next/image";
import { ExternalLink, ChevronDown } from "lucide-react";

const categories = ["All", "Frontend", "Backend", "Fullstack"];

export default function MyProject() {
  const [selected, setSelected] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false); // for mobile dropdown

  const filteredProjects =
    selected === "All"
      ? myproject
      : myproject.filter((p) => p.category === selected);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 bg-black text-white">
      {/* Category Filter */}
      <div className="mb-10 text-center">
        {/* Mobile Dropdown */}
        <div className="relative sm:hidden w-full max-w-xs mx-auto">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span>{selected}</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Smooth Dropdown List */}
          {/* Smooth Dropdown List */}
          <div
            className={`absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 z-50 ${
              open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelected(cat);
                  setShowAll(false);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition ${
                  selected === cat
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:flex justify-center gap-3 flex-wrap backdrop-blur-sm py-3 px-4 rounded-xl shadow-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setShowAll(false);
              }}
              className={`px-5 py-2 text-sm sm:text-base font-medium rounded-full border transition-all duration-300 
          ${
            selected === cat
              ? "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-transparent shadow-lg scale-105"
              : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
          }
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900
        `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {displayedProjects.map((project, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition group"
          >
            <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={320}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-sm text-gray-300">
                  No Image
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              <h3 className="font-semibold text-lg sm:text-xl text-white">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project?.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#225043] text-purple-200 text-xs sm:text-sm px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 text-sm sm:text-base">
                <a
                  href={project.link}
                  target="_blank"
                  className="text-[#54c2a3] hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {filteredProjects.length > 3 && (
        <div className="mt-10 text-center ">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-[#225043] hover:bg-[#143028] text-white rounded-full transition text-sm sm:text-base"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}
