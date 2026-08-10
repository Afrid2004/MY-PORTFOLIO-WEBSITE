"use client";

import BookMeeting from "@/components/Buttons/BookMeeting";
import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight, FiMail } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { motion } from "motion/react";
import MagneticButton from "@/components/Buttons/MagneticButton";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
  const fadeDelayUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const fadeVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <footer>
      {/* Gradient Top Border */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-400 to-transparent" />

      <div>
        <div className=" bg-base-200/70 relative overflow-hidden">
          <div className="container py-16">
            {/* CTA */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.h2
                variants={fadeVariants}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
              >
                Let's Build Something{" "}
                <motion.span
                  variants={fadeDelayUpVariants}
                  className="text-primary inline-block"
                >
                  Amazing
                </motion.span>
              </motion.h2>

              <motion.p
                variants={fadeUpVariants}
                className="mt-5 text-base-content/70 leading-7"
              >
                I'm available for freelance projects, remote jobs and exciting
                full-stack development opportunities.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              >
                <MagneticButton className="w-full sm:w-fit">
                  <BookMeeting />
                </MagneticButton>
                <MagneticButton className="w-full sm:w-fit">
                  <Link
                    href="mailto:mdfaisalafrid@gmail.com"
                    className="inline-flex items-center gap-3 rounded-full border-2 border-white/15 bg-transparent px-6 py-4 font-medium text-base-content transition-all h-full duration-300 hover:border-primary hover:text-primary cursor-pointer w-full justify-center sm:w-fit"
                  >
                    <FiMail size={17} />
                    <span className="leading-none">Contact Me</span>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <div className="my-16 h-px bg-linear-to-r from-transparent via-gray-600 to-transparent" />

            {/* Footer Grid */}
            <div className="grid gap-10 md:grid-cols-3">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  <div className="w-50">
                    <Logo></Logo>
                  </div>
                </h3>

                <p className="mt-4 text-base-content/70 leading-7">
                  Passionate Full Stack Developer building scalable,
                  high-performance web applications with Next.js, React,
                  Node.js, Laravel, PHP, MongoDB, and MySQL.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>

                <ul className="space-y-3 text-base-content/70">
                  <li>
                    <Link
                      href="/"
                      className="w-fit group flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 flex leading-none"
                      />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="w-fit group flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span>About</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="w-fit group flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span>Projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="w-fit group flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span>Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="w-fit group flex items-center gap-2 transition-colors duration-300 hover:text-primary"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Let's Connect</h4>

                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                  >
                    <FaGithub size={18} />
                  </a>

                  <a
                    href="#"
                    className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                  >
                    <FaLinkedin size={18} />
                  </a>

                  <a
                    href="#"
                    className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                  >
                    <FaFacebook size={18} />
                  </a>

                  <a
                    href="mailto:hello@example.com"
                    className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                  >
                    <HiOutlineEnvelope size={20} />
                  </a>
                </div>

                <div className="hover-underline mt-6 inline-block">
                  <a
                    href="mailto:mdfaisalafrid@gmail.com"
                    className="group flex items-center gap-1 text-base-content/70  transition-all duration-300 hover:text-primary"
                  >
                    <span className="font-medium">mdfaisalafrid@gmail.com</span>
                    <span className="flex items-center justify-center hover:border-primary hover:text-primary transition-all group-hover:translate-x-1">
                      <FiArrowRight size={20} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 h-px bg-linear-to-r from-transparent via-gray-600 to-transparent" />

            {/* Bottom */}
            <div className=" pt-6  flex flex-col md:flex-row items-center justify-between gap-5">
              <p className="text-sm">
                © {new Date().getFullYear()} Faisal Afrid. All rights reserved.
              </p>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm bg-base-100 px-4 py-2 rounded-4xl hover:bg-primary hover:text-secondary transition-colors border border-base-300"
              >
                Back to Top
                <FaArrowUp />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-50 -left-10 md:-left-60 lg:-left-80 pointer-events-none select-none">
            <div
              className="
      w-75 h-75
      md:w-[550px] md:h-[550px]
      lg:w-[800px] lg:h-[800px]
      rounded-full
      blur-[100px] md:blur-[140px]
      bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
    "
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
