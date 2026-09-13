import React from "react";

const ServicesLoading = () => {
  return (
    <div className="divide-y divide-base-content/10">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-5 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0"
        >
          {/* Service */}
          <div className="min-w-0 md:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                {/* Drag Handle */}
                <div className="mt-2 hidden h-7 w-7 shrink-0 animate-pulse rounded-lg bg-base-300 sm:block md:block" />

                {/* Icon */}
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-base-300" />

                {/* Title */}
                <div className="min-w-0 flex-1">
                  <div className="h-3.5 w-44 max-w-full animate-pulse rounded bg-base-300" />

                  <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-base-300" />
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex shrink-0 items-center gap-2 md:hidden">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Description */}
              <div className="min-w-0 w-full space-y-2">
                <div className="h-2.5 w-full max-w-md animate-pulse rounded bg-base-300" />

                <div className="h-2.5 w-10/12 max-w-md animate-pulse rounded bg-base-300" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3 md:block">
              {/* Mobile Label */}
              <div className="h-2.5 w-10 shrink-0 animate-pulse rounded bg-base-300 md:hidden" />

              {/* Status */}
              <div className="h-6 w-16 shrink-0 animate-pulse rounded-full bg-base-300" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />

            <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesLoading;
