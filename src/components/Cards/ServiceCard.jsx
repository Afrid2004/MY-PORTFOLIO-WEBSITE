"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "../Reavel/Reavel";


const ServiceCard = ({ service, idx }) => {
  const Icon = service.icon;

  return (
    <Reveal
      initial="opacity-0 scale-95"
      view="opacity-100 scale-100"
      transition={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[${idx * 100}ms]`}
      viewport={0.3}
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5">
        <div className="relative flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-base-content/80">
            <Icon />
          </div>

          <span className="select-none text-4xl font-bold tracking-tight text-primary transition-all duration-500">
            0{idx + 1}
          </span>
        </div>

        <div className="relative mt-7">
          <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
            {service.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-base-content/55">
            {service.description}
          </p>
        </div>

        <div className="relative mt-7 h-px w-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-wider text-base-content/40 transition-colors duration-300 group-hover:text-base-content/70">
            Service
          </span>

          <span className="flex items-center gap-1.5 text-sm font-medium text-primary/70 transition-all duration-300 group-hover:gap-3 group-hover:text-primary">
            Explore
            <FiArrowRight size={18} />
          </span>
        </div>
      </div>
    </Reveal>
  );
};

export default ServiceCard;
