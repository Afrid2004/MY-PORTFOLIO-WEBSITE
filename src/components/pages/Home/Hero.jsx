import Image from "next/image";
import React from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="relative ">
      <div className="py-30 container">
        <div className="py-10">
          <div className="grid grid-cols-12 lg:gap-10">
            <div className="col-span-12 lg:col-span-7 mb-10 lg:mb-0">
              <div>
                <div className="flex items-center justify-center gap-3 bg-base-200 border border-base-300 w-fit px-4 py-2 rounded-4xl mb-5 ">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <p className="text-sm">Ready to Collaborate</p>
                </div>

                <h1 className="font-semibold text-white text-[55px] md:text-7xl xl:text-8xl 2xl:text-9xl mb-7 wrap-break-word">
                  MD Faisal Yousuf <span className="text-primary">Afrid</span>
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3 mb-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30  px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

                    <span className="text-sm font-semibold text-primary">
                      Junior Full Stack Developer
                    </span>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full  bg-base-200 px-4 py-2 border border-white/10">
                      <span className="text-sm">
                        Next.js • React • Node.js • Laravel
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-10 flex ">
                  <p className="text-secondary-content/70  leading-7 w-full">
                    I specialize in building modern, scalable web applications
                    with Next.js, React, Node.js, Laravel, and MongoDB. Focused
                    on clean code, performance, and creating exceptional user
                    experiences.
                  </p>
                </div>

                <div className="flex items-center flex-wrap md:flex-nowrap gap-2">
                  <button className="group inline-flex items-center gap-3 rounded-full border-2 border-primary bg-primary px-6 py-3 font-medium text-secondary transition-all duration-300 hover:bg-transparent hover:text-primary cursor-pointer w-full justify-center sm:w-fit">
                    <span>View Projects</span>

                    <FiArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                  <button className="group inline-flex items-center gap-3 rounded-full border-2 border-white/15 bg-transparent px-6 py-3 font-medium text-base-content transition-all duration-300 hover:border-primary hover:text-primary cursor-pointer w-full justify-center sm:w-fit">
                    <FiDownload
                      size={18}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                    />

                    <span>View Resume</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="h-full w-full flex items-end justify-center">
                <div className="w-fit 2xl:translate-y-6">
                  <Image
                    src={"/assets/images/faisalfreelancer.png"}
                    className="md:w-150 lg:w-auto"
                    width={696}
                    height={604}
                    alt="faisal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 -left-10 md:-left-60 lg:-left-80 pointer-events-none select-none">
        <div
          className="
      w-75 h-75
      md:w-[550px] md:h-[550px]
      lg:w-[700px] lg:h-[700px]
      rounded-full
      blur-[100px] md:blur-[140px]
      bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
    "
        />
      </div>

      <div className="absolute bottom-0 right-10 pointer-events-none select-none -z-1">
        <div
          className="
          w-75 h-75
      md:w-100 md:h-100
      
      rounded-full
      blur-[100px] md:blur-[140px]
      bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
    "
        />
      </div>

      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full opacity-[0.5]"
          style={{
            backgroundImage: `
        linear-gradient(#062241 1px, transparent 1px),
        linear-gradient(90deg, #062241 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
