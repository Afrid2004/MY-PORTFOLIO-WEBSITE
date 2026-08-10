"use client";
import Logo from "@/components/Logo/Logo";
import NavLink from "@/components/NavLink/NavLink";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "motion/react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -12,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 768) {
        setMenu(false);
      }
    };

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setShowNavbar(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const menus = (
    <>
      <motion.li variants={navItemVariants}>
        <NavLink href={"/"}>Home</NavLink>
      </motion.li>
      <motion.li variants={navItemVariants}>
        <NavLink href={"/about"}>About</NavLink>
      </motion.li>
      <motion.li variants={navItemVariants}>
        <NavLink href={"/services"}>Services</NavLink>
      </motion.li>
      <motion.li variants={navItemVariants}>
        <NavLink href={"/experience"}>Experience</NavLink>
      </motion.li>
      <motion.li variants={navItemVariants}>
        <NavLink href={"/education"}>Education</NavLink>
      </motion.li>
    </>
  );
  return (
    <div>
      <header
        className={`
    fixed
    top-0
    left-0
    w-full
    z-50
    transition-all
    duration-500
    ${showNavbar ? "translate-y-0 " : "-translate-y-full"}
  `}
      >
        <div className="container">
          <div className="relative my-5" ref={menuRef}>
            <div>
              <div className="flex items-center justify-between pr-3 px-6 py-3 bg-base-200 rounded-[9999px] border border-secondary">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: "easeOut",
                  }}
                  className="w-40"
                >
                  <Logo></Logo>
                </motion.div>
                {/* desktop navigation menus  */}
                <nav>
                  <div className="flex items-center gap-1">
                    <motion.ul
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.25,
                          },
                        },
                      }}
                      className=" items-center gap-1 hidden md:flex"
                    >
                      {menus}
                    </motion.ul>
                    {/* menu bar */}
                    <button
                      onClick={() => setMenu(!menu)}
                      className="relative bg-primary text-base-200 active:bg-primary-hover cursor-pointer w-10 h-10 flex items-center justify-center rounded-full md:hidden"
                    >
                      <FiMenu
                        size={20}
                        className={`absolute transition-all duration-300 ease-in-out ${
                          menu
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                        }`}
                      />
                      <FiX
                        size={23}
                        className={`absolute transition-all duration-200 ease-in-out ${
                          menu
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-0 opacity-0"
                        }`}
                      />
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* mobile menus  */}
            <div
              className={`absolute p-3 w-full bg-base-200 rounded-2xl border border-secondary right-0 top-[calc(100%+1rem)] transform origin-top-right transition-all duration-150 ${menu ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none scale-95 -translate-y-2"}`}
            >
              <ul className="flex flex-col  gap-1 w-full h-full">{menus}</ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
