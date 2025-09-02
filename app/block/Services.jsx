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

  const services = [
    {
      icon: <CodeIcon size={28} className="text-[#81fad8]" />,
      title: "Website Development",
      description:
        "Custom, responsive websites built with modern technologies that provide exceptional user experiences across all devices.",
      delay: 0,
    },
    {
      icon: <PenToolIcon size={28} className="text-[#81fad8]" />,
      title: "UI/UX Design",
      description:
        "User-centered design that balances beautiful interfaces with seamless functionality to engage your audience.",
      delay: 100,
    },
    {
      icon: <BrushIcon size={28} className="text-[#81fad8]" />,
      title: "Branding & Logo Design",
      description:
        "Distinctive brand identity and logo design that communicates your company's values and resonates with your target audience.",
      delay: 200,
    },
    {
      icon: <BarChartIcon size={28} className="text-[#81fad8]" />,
      title: "Performance Optimization",
      description:
        "Speed up your website, improve SEO rankings, and enhance user experience through technical optimization.",
      delay: 300,
    },
    {
      icon: <MonitorIcon size={28} className="text-[#81fad8]" />,
      title: "Responsive Design",
      description:
        "Ensure your website looks and functions perfectly on all devices, from desktops to smartphones.",
      delay: 400,
    },
    {
      icon: <LayersIcon size={28} className="text-[#81fad8]" />,
      title: "Web Application Development",
      description:
        "Custom web applications with complex functionality tailored to your specific business needs.",
      delay: 500,
    },
  ];

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
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
