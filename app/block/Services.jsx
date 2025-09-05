"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import {
  CodeIcon,
  PenToolIcon,
  BrushIcon,
  BarChartIcon,
  MonitorIcon,
  LayersIcon,
} from "lucide-react";

import servicesData from "@/Static/services.json";

// Map string names in JSON → actual Lucide icons
const icons = {
  CodeIcon,
  PenToolIcon,
  BrushIcon,
  BarChartIcon,
  MonitorIcon,
  LayersIcon,
};

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  const card = useScrollAnimation(0.2);

  return (
    <div
      ref={card.ref}
      className={`bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
        card.isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-14 h-14 bg-[#225043] rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const Services = () => {
  const title = useScrollAnimation(0.1);

  return (
    <section
      id="services"
      className="snap-start min-h-screen flex items-center py-20 px-6 lg:px-16 "
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          ref={title.ref}
          className={`text-center mb-16 transition-all duration-700 transform ${
            title.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl font-bold text-white">My Services</h2>
          <div className="w-24 h-1 bg-[#81fad8] mx-auto mt-4"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            I offer a comprehensive range of services to help your business
            stand out in the digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <ServiceCard
                key={index}
                icon={<Icon size={28} className="text-[#81fad8]" />}
                title={service.title}
                description={service.description}
                delay={service.delay}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
