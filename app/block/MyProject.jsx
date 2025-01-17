import { useState } from "react";
import myproject from "@/Static/myproject.json";
import Image from "next/image";

export default function MyProject() {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? myproject : myproject.slice(0, 6);

  return (
    <section className="p-8 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {displayedProjects.map((project, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group hover:cursor-pointer"
          >
            <div className="h-48 sm:h-56 md:h-64 lg:h-80 w-full bg-gray-200 flex justify-center items-center relative group-hover:opacity-50 shadow-lg group-hover:shadow-2xl group-hover:shadow-gray-900">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={320}
                  className="object-cover w-full h-full shadow-inner"
                />
              ) : (
                <span className="text-gray-400">
                  No Image Available..Coming soon
                </span>
              )}
            </div>

            <div className="absolute inset-0 bg-gray-900 bg-opacity-70 text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-xl font-semibold sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base">{project.discription}</p>
            </div>
          </div>
        ))}
      </div>

      {myproject.length > 6 && (
        <div className="flex justify-center mt-20">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-black text-white border border-white rounded-lg hover:bg-gray-800 transition duration-300"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </section>
  );
}
