"use client";
import Logo from "@/components/Logo/Logo";
import NavLink from "@/components/NavLink/NavLink";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

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

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const menus = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink href={"/experience"}>Experience</NavLink>
      </li>
      <li>
        <NavLink href={"/education"}>Education</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <header>
        <div className="container">
          <div className="relative my-5" ref={menuRef}>
            <div>
              <div className="flex items-center justify-between pr-3 px-6 py-3 bg-base-200 rounded-4xl border border-secondary">
                <div className="w-40">
                  <Logo></Logo>
                </div>
                {/* desktop navigation menus  */}
                <nav>
                  <div className="flex items-center gap-1">
                    <ul className=" items-center text-lg gap-1 hidden md:flex">
                      {menus}
                    </ul>
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
              <ul className="flex flex-col text-lg gap-1 w-full h-full">
                {menus}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
