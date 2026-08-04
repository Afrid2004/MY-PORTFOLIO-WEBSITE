"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const activePath =
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const activeClass = "bg-base-300 text-primary";
  return (
    <Link
      href={href}
      className={`${activePath ? activeClass : "hover:bg-base-300"} px-4 py-2 rounded-xl md:rounded-4xl transition-all duration-150 w-full flex md:w-auto`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
