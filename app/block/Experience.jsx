"use client";
import { GraduationCap, Briefcase, User } from "lucide-react";
import data from "../../Static/experience.json"; 

export default function Experience() {
  const { education, experiences, references } = data;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-12 sm:py-16 bg-black text-gray-100">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Education */}
        <div>
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-8">
            <GraduationCap className="text-blue-400" />
            Education
          </h2>
          <div className="relative border-l border-gray-700">
            {education.map((edu, i) => (
              <div
                key={i}
                className="ml-6 mb-10 relative animate-fade-in-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-blue-400 border-4 border-black"></div>
                <div className="bg-gray-900/70 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800">
                  <h3 className="text-base sm:text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{edu.school}</p>
                  <p className="text-xs sm:text-sm text-blue-400">{edu.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-8">
            <Briefcase className="text-green-400" />
            Experience
          </h2>
          <div className="relative border-l border-gray-700">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="ml-6 mb-10 relative animate-fade-in-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-green-400 border-4 border-black"></div>
                <div className="bg-gray-900/70 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800">
                  <h3 className="text-base sm:text-lg font-semibold">{exp.role}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{exp.company}</p>
                  <p className="text-xs sm:text-sm text-green-400 mb-2">{exp.years}</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div>
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-8">
            <User className="text-purple-400" />
            References
          </h2>
          <div className="relative border-l border-gray-700">
            {references.map((ref, i) => (
              <div
                key={i}
                className="ml-6 mb-10 relative animate-fade-in-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-purple-400 border-4 border-black"></div>
                <div className="bg-gray-900/70 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800">
                  <h3 className="text-base sm:text-lg font-semibold">{ref.name}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{ref.position}</p>
                  <p className="text-xs sm:text-sm text-purple-400">{ref.email}</p>
                  <p className="text-xs sm:text-sm text-purple-400">{ref.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
