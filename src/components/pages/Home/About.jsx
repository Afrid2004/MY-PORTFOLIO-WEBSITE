"use client";
import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiAward, FiCheck, FiMail, FiMapPin, FiUser } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { motion } from "motion/react";

const About = () => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    e.currentTarget.style.setProperty("--x", `${x}px`);
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const leftVariants = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const modernVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <section className="relative py-16 lg:py-28 overflow-hidden">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-12 lg:gap-16"
        >
          <motion.div
            variants={leftVariants}
            className="col-span-12 lg:col-span-5 mb-8 lg:mb-0"
          >
            <div className="bg-white/2  rounded-2xl p-px gradient-borders">
              <div className="rounded-sm p-3 md:p-6">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src="/assets/images/faisalimage.png"
                    alt="Faisal"
                    width={600}
                    height={600}
                    className="w-full h-[400px] object-cover object-top transition duration-700 hover:scale-105"
                  />

                  {/* Status */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 rounded-full bg-base-100/80 backdrop-blur-md px-3 py-1.5 border border-primary/20">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-xs font-medium">
                        Available for Work
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-7 text-center">
                  <h3 className="text-2xl font-semibold">
                    MD Faisal Yousuf Afrid
                  </h3>

                  <p className="mt-2 text-base-content/60">
                    Junior Full Stack Developer
                  </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Social */}
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-base-200 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <FaGithub size={20} />
                  </a>

                  <a
                    href="#"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-base-200 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <FaLinkedin size={20} />
                  </a>

                  <a
                    href="#"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-base-200 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <FaFacebook size={20} />
                  </a>

                  <a
                    href="#"
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-base-200 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 hover:-translate-y-1"
                  >
                    <HiOutlineEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={rightVariants}
            className="col-span-12 lg:col-span-7"
          >
            <motion.div
              variants={fadeUpVariants}
              className="gradient-border w-fit p-0.5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium uppercase tracking-wider">
                  About Me
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={containerVariants}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
            >
              Building{" "}
              <motion.span
                variants={modernVariants}
                className="text-primary inline-block"
              >
                Modern{" "}
              </motion.span>{" "}
              Web Applications
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-7 max-w-2xl text-base leading-8 text-base-content/90 mb-5"
            >
              I'm a Junior Full Stack Developer passionate about building
              modern, scalable, and high-performance web applications. I
              specialize in creating responsive user interfaces, developing
              reliable backend systems, and delivering seamless digital
              experiences. With a strong focus on clean code, performance, and
              usability, I enjoy turning ideas into functional products that
              solve real-world problems.
            </motion.p>

            <div>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <motion.div
                  variants={fadeUpVariants}
                  onMouseMove={handleMouseMove}
                  className="card-hover bg-white/5 border border-white/10 p-5 rounded-2xl h-full relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiUser className="shrink-0" /> Name
                    </div>
                    <div>Muhammed Faisal Yousuf Afrid</div>
                  </div>
                </motion.div>
                <div
                  onMouseMove={handleMouseMove}
                  className="card-hover bg-white/5 border border-white/10 p-5 rounded-2xl h-full relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiMail className="shrink-0" /> Email
                    </div>
                    <div>mdfaisalafrid@gmail.com</div>
                  </div>
                </div>
                <div
                  onMouseMove={handleMouseMove}
                  className="card-hover bg-white/5 border border-white/10 p-5 rounded-2xl h-full"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <FiMapPin className="shrink-0" /> Location
                  </div>
                  <div>Merul Badda, Gulshan, Dhaka-1212</div>
                </div>
                <div
                  onMouseMove={handleMouseMove}
                  className="card-hover bg-white/5 border border-white/10 p-5 rounded-2xl h-full"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <FiCheck className="shrink-0" /> Availability
                  </div>
                  <div>Open to work</div>
                </div>
              </motion.div>
            </div>

            <div></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
