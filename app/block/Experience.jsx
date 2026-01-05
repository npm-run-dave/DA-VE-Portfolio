"use client";
import { GraduationCap, Briefcase, User } from "lucide-react";
import data from "../../Static/experience.json";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
export default function Experience() {
  const { education, experiences, references } = data;

  const AnimatedItem = ({ children, delay = 0 }) => {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    );
  };

  return (
    <section className="w-full px-6 py-16 bg-black text-gray-100">
      <div className="max-w-6xl mx-auto space-y-16">
        <div>
          <h2 className="flex items-center gap-2 text-3xl font-bold mb-8">
            <GraduationCap className="text-blue-400" />
            Education
          </h2>
          <div className="relative border-l border-gray-700">
            {education.map((edu, i) => (
              <AnimatedItem key={i} delay={i * 0.2}>
                <div className="ml-6 mb-10 relative">
                  <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-blue-400 border-4 border-black"></div>
                  <div className="bg-gray-900/70 p-6 rounded-2xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.school}</p>
                    <p className="text-sm text-blue-400">{edu.years}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-3xl font-bold mb-8">
            <Briefcase className="text-green-400" />
            Experience
          </h2>
          <div className="relative border-l border-gray-700">
            {experiences.map((exp, i) => (
              <AnimatedItem key={i} delay={i * 0.2}>
                <div className="ml-6 mb-10 relative">
                  <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-green-400 border-4 border-black"></div>
                  <div className="bg-gray-900/70 p-6 rounded-2xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-gray-400">{exp.company}</p>
                    <p className="text-sm text-green-400 mb-2">
                      {exp.startYear} –{""}
                      {exp.endYear || new Date().getFullYear()}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-3xl font-bold mb-8">
            <User className="text-purple-400" />
            References
          </h2>
          <div className="relative border-l border-gray-700">
            {references.map((ref, i) => (
              <AnimatedItem key={i} delay={i * 0.2}>
                <div className="ml-6 mb-10 relative">
                  <div className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-purple-400 border-4 border-black"></div>
                  <div className="bg-gray-900/70 p-6 rounded-2xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold">{ref.name}</h3>
                    <p className="text-gray-400">{ref.position}</p>
                    <p className="text-sm text-purple-400">{ref.email}</p>
                    <p className="text-sm text-purple-400">{ref.phone}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
