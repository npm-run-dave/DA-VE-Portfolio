import React from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/80 to-gray-900/90 backdrop-blur-sm border border-gray-800/50 hover:border-teal-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/10 h-full flex flex-col">
      <div className="h-48 sm:h-52 overflow-hidden relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image Available</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-teal-400 border border-teal-500/20">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project?.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-800/80 text-xs px-2.5 py-1 rounded-full text-teal-300 border border-teal-800/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800/50">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
            >
              <span className="text-sm">Live Demo</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
