"use client";
import { useState } from "react";
import myproject from "@/Static/myproject.json";
import { ChevronDown } from "lucide-react";
import ProjectCard from "./ProjectCard"; // ✅ use default import

const categories = ["All", "Frontend", "Backend", "Fullstack"];

export default function MyProject() {
  const [selected, setSelected] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);

  const filteredProjects =
    selected === "All"
      ? myproject
      : myproject.filter((p) => p.category === selected);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  return (
    <section className="min-h-screen w-full  text-white px-4 sm:px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600 mb-3">
            My Projects
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Explore my portfolio of work across various technologies and domains
          </p>
        </div>

        <div className="relative sm:hidden w-full max-w-xs mx-auto mb-8">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-800/70 backdrop-blur-sm text-gray-200 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            <span>{selected}</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`absolute left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-xl transition-all duration-300 z-50 ${
              open
                ? "max-h-60 opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
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
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-700/70 transition-colors ${
                  selected === cat
                    ? "bg-teal-600/70 text-white"
                    : "text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setShowAll(false);
              }}
              className={`px-6 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 
                ${
                  selected === cat
                    ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white border-transparent shadow-lg shadow-teal-700/20"
                    : "bg-gray-800/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/70 hover:text-white"
                }
              focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white rounded-full transition-all duration-300 shadow-lg shadow-teal-700/20 transform hover:translate-y-[-2px]"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
