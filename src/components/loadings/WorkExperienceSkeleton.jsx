import React from "react";

const WorkExperienceSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-5 animate-pulse">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
        <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:flex-col">
          {[...Array(3)].map((_, item) => (
            <div
              key={item}
              className="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 sm:w-[calc(50%-0.625rem)] lg:w-full"
            >
              <div className="h-4 w-3/4 rounded bg-base-content/10" />
              <div className="mt-3 h-3 w-1/2 rounded bg-base-content/10" />
              <div className="mt-3 h-3 w-2/3 rounded bg-base-content/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
          <div className="border-b border-white/10 bg-primary/5 px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full">
                <div className="h-8 w-2/3 rounded bg-base-content/10" />
                <div className="mt-3 h-4 w-1/3 rounded bg-base-content/10" />
              </div>
              <div className="h-4 w-32 rounded bg-base-content/10" />
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <div className="h-3 w-20 rounded bg-base-content/10" />
              <div className="mt-3 h-4 w-2/3 rounded bg-base-content/10" />
            </div>

            <div>
              <div className="h-5 w-40 rounded bg-base-content/10" />

              <div className="mt-5 space-y-4">
                {[...Array(4)].map((_, item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-base-content/10" />
                    <div className="h-4 w-full rounded bg-base-content/10" />
                  </div>
                ))}
              </div>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div>
              <div className="h-5 w-32 rounded bg-base-content/10" />

              <div className="mt-5 flex flex-wrap gap-2">
                {[...Array(5)].map((_, item) => (
                  <div
                    key={item}
                    className="h-8 w-20 rounded-full bg-base-content/10"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceSkeleton;
