"use client";

import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="h-full rounded-2xl bg-white/[0.025] p-6"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            {/* Icon skeleton */}
            <div className="h-14 w-14 animate-pulse rounded-2xl  bg-white/10" />

            {/* Number skeleton */}
            <div className="h-10 w-12 animate-pulse rounded-lg bg-white/10" />
          </div>

          {/* Content */}
          <div className="mt-7">
            {/* Title */}
            <div className="h-6 w-3/5 animate-pulse rounded-md bg-white/10" />

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-white/10" />
              <div className="h-3 w-[90%] animate-pulse rounded bg-white/10" />
              <div className="h-3 w-[75%] animate-pulse rounded bg-white/10" />
            </div>
          </div>

          {/* Divider */}
          <div className="mt-7 h-px w-full bg-white/5" />

          {/* Bottom */}
          <div className="mt-5 flex items-center justify-between">
            <div className="h-4 w-16 animate-pulse rounded bg-white/10" />

            <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSkeleton;
