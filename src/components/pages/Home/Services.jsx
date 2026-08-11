"use client";
import ServiceCard from "@/components/Cards/ServiceCard";
import React from "react";

import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaLaravel,
  FaWordpress,
  FaMobileScreenButton,
} from "react-icons/fa6";

const Services = () => {
  const services = [
    {
      title: "Full Stack Web Development",
      description:
        "Complete web applications with modern frontend, backend, APIs, authentication, and databases.",
      icon: FaCode,
    },
    {
      title: "Frontend Development",
      description:
        "Modern, responsive, and interactive interfaces using React, Next.js, Tailwind CSS, and Bootstrap.",
      icon: FaLaptopCode,
    },
    {
      title: "Backend & API Development",
      description:
        "Secure REST APIs, authentication, database integration, and reliable server-side functionality.",
      icon: FaServer,
    },
    {
      title: "Laravel Development",
      description:
        "Laravel-based web applications, CRUD systems, authentication, admin panels, and database-driven solutions.",
      icon: FaLaravel,
    },
    {
      title: "WordPress Development",
      description:
        "Custom WordPress websites, theme customization, business websites, and news portals.",
      icon: FaWordpress,
    },
    {
      title: "Responsive Web Design",
      description:
        "Clean and modern interfaces that provide a smooth experience across desktop, tablet, and mobile devices.",
      icon: FaMobileScreenButton,
    },
  ];
  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="gradient-border w-fit p-0.5 mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="text-sm font-medium uppercase tracking-wider">
                My Services
              </span>
            </div>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            What I Can <span className="text-primary">Do For You</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-base-content/60">
            I build modern, responsive, and scalable web solutions tailored to
            your business needs and goals.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => {
              return (
                <ServiceCard
                  key={idx}
                  idx={idx}
                  service={service}
                ></ServiceCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
