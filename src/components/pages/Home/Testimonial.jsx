"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Reveal from "@/components/Reavel/Reavel";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const testimonials = [
    {
      image: "/assets/images/abdullah.jpg",
      name: "Mohammad Abdullah",
      desc: "He is very good at what he is doing. I like his work. Especially the unique point of view of designing.",
    },
    {
      image: "/assets/images/tarequl.jpg",
      name: "Tarequl Islam",
      desc: "Amazing communication skills. Always understand what I am trying to achieve. Also, his work is really amazing.",
    },
    {
      image: "/assets/images/aminul.jpg",
      name: "Aminul Islam",
      desc: "I love the website designed by Afrid, he has creativity in designing new designs and he is good at it. Best wishes, Keep it up!",
    },
    {
      image: "/assets/images/istiaq.jpg",
      name: "Ishtiaq Sunny",
      desc: "He is a good Designer. He has created a Responsive Website for me within a few days. I really like his work.",
    },
  ];

  return (
    <section className="relative py-20">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            viewport={0.2}
          >
            <div className="gradient-border mx-auto w-fit p-0.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

                <span className="text-sm font-medium uppercase tracking-wider">
                  Testimonials
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[120ms]"
            viewport={0.2}
          >
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              What People <span className="text-primary">Say</span>
            </h2>
          </Reveal>

          <Reveal
            initial="opacity-0 translate-y-7"
            view="opacity-100 translate-y-0"
            transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[240ms]"
            viewport={0.2}
          >
            <p className="mt-5 text-base leading-8 text-base-content/60">
              Feedback from people I have worked with and collaborated with on
              different projects.
            </p>
          </Reveal>
        </div>

        {/* Testimonials */}
        <Reveal
          initial="opacity-0 translate-y-7"
          view="opacity-100 translate-y-0"
          transition="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[300ms]"
          viewport={0.2}
        >
          <div className="relative mt-14">
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={setSwiper}
              onRealIndexChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              navigation={{
                prevEl: ".testimonial-prev",
                nextEl: ".testimonial-next",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              speed={700}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="overflow-hidden! pb-2!"
            >
              {testimonials.map((testimonial, idx) => (
                <SwiperSlide key={idx} className="h-auto!">
                  <div className="group relative flex h-full min-h-82.5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:bg-white/[0.05]">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      {/* Quote Icon */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-base-content/80 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
                        <FaQuoteLeft size={18} />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 pt-1 text-primary">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} size={13} />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="mt-6">
                      <p className="line-clamp-4 text-sm leading-7 text-base-content/55">
                        "{testimonial.desc}"
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto pt-6">
                      {/* Divider */}
                      <div className="relative h-px w-full overflow-hidden bg-white/10">
                        <div className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                      </div>

                      {/* Client */}
                      <div className="mt-5 flex items-center">
                        {/* Image */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {/* Name */}
                        <div className="ml-4">
                          <h3 className="text-sm font-semibold tracking-tight">
                            {testimonial.name}
                          </h3>

                          <p className="mt-1 text-xs text-base-content/40">
                            Client
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom Controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              {/* Previous */}
              <button
                type="button"
                className="testimonial-prev flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-base-content/60 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-secondary active:scale-90"
                aria-label="Previous testimonial"
              >
                <FiArrowLeft size={18} />
              </button>
              
              {/* Dynamic Pagination */}
              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => {
                      swiper?.slideToLoop(index);
                    }}
                    className={`h-[7px] cursor-pointer rounded-full transition-all duration-350 ${
                      activeIndex === index
                        ? "w-6 bg-primary opacity-100"
                        : "w-[7px] bg-base-content/40 opacity-35"
                    }`}
                  />
                ))}
              </div>
              {/* Next */}
              <button
                type="button"
                className="testimonial-next flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-base-content/60 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-secondary active:scale-90"
                aria-label="Next testimonial"
              >
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 top-20 -z-10 select-none md:-right-60 lg:-right-80">
        <div className="h-75 w-75 rounded-full bg-[radial-gradient(circle,#209181_0%,transparent_70%)] blur-[100px] md:h-[550px] md:w-[550px] md:blur-[140px] lg:h-[700px] lg:w-[700px]" />
      </div>
    </section>
  );
};

export default Testimonials;
