"use client";

import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-24">
      {/* Gradient Top Border */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-400 to-transparent" />

      <div className=" bg-no-repeat bg-cover bg-center">
        <div className=" bg-base-200/70 relative overflow-hidden">
          <div className="container py-16">
            {/* CTA */}
            <div className="text-center max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-8xl font-bold">
                Let's Build Something{" "}
                <span className="text-primary">Amazing</span>
              </h2>

              <p className="mt-5 text-base-content/70 leading-7">
                I'm available for freelance projects, remote jobs and exciting
                full-stack development opportunities.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn btn-primary rounded-full px-8"
                >
                  Hire Me
                </Link>

                <Link
                  href="/resume.pdf"
                  className="btn btn-outline rounded-full px-8"
                >
                  Download Resume
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="my-14" />

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

            {/* Bottom */}
            <div className="mt-16 pt-6  flex flex-col md:flex-row items-center justify-between gap-5">
              <p className="text-sm text-base-content/60">
                © {new Date().getFullYear()} Faisal Afrid. All rights reserved.
              </p>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                Back to Top
                <FaArrowUp />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0">
            <Image
              src={"/assets/images/blur.png"}
              className="pointer-events-none select-none"
              draggable={false}
              width={1200}
              height={1200}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
