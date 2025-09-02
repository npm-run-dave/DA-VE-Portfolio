import { useState } from "react";
import myproject from "@/Static/myproject.json";
import Image from "next/image";
import { ExternalLink, Code } from "lucide-react";

const categories = ["All", "Frontend", "Backend", "Fullstack"];

export default function MyProject() {
  const [selected, setSelected] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selected === "All"
      ? myproject
      : myproject.filter((p) => p.category === selected);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  return (
    <section className="px-4 py-10 min-h-screen bg-black text-white">
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelected(cat);
              setShowAll(false); // reset on category change
            }}
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              selected === cat
                ? "bg-[#225043] text-white border-white"
                : "bg-gray-800 text-gray-300 border-gray-600"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
          >
            <div className="h-48 relative overflow-hidden">
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

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project?.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#225043] text-purple-200 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 text-sm">
                <a
                  href={project.link}
                  target="_blank"
                  className="text-[#54c2a3] hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
                 
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length > 3 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-[#225043] hover:bg-[#143028] text-white rounded-full transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}
