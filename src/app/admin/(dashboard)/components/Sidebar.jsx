"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiFolder,
  FiAward,
  FiMessageSquare,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import Image from "next/image";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    title: "Portfolio",
    icon: FiFolder,
    children: [
      {
        title: "Skills",
        href: "/admin/skills",
        icon: FiCode,
      },
      {
        title: "Services",
        href: "/admin/services",
        icon: FiBriefcase,
      },
      {
        title: "Experience",
        href: "/admin/experience",
        icon: FiBriefcase,
      },
      {
        title: "Education",
        href: "/admin/education",
        icon: FiBookOpen,
      },
      {
        title: "Projects",
        href: "/admin/projects",
        icon: FiFolder,
      },
      {
        title: "Certifications",
        href: "/admin/certifications",
        icon: FiAward,
      },
      {
        title: "Testimonials",
        href: "/admin/testimonials",
        icon: FiMessageSquare,
      },
    ],
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FiFileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const [portfolioOpen, setPortfolioOpen] = useState(true);

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-base-content/10 px-5 sm:px-6">
        <Link
          href="/admin"
          onClick={handleLinkClick}
          className="flex items-center gap-3"
        >
          {/* Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 p-px">
            <Image
              src="/favicon.ico"
              alt="Faisal Afrid"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-sm font-semibold">Faisal Afrid</h1>

            <p className="text-[10px] text-base-content/40">Admin Panel</p>
          </div>
        </Link>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-base-content/50 transition-all hover:bg-base-content/5 hover:text-base-content lg:hidden"
        >
          <FiX size={19} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-base-content/35">
          Management
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            {
              /* Portfolio */
            }
            if (item.children) {
              return (
                <div key={item.title}>
                  <button
                    type="button"
                    onClick={() => setPortfolioOpen(!portfolioOpen)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-base-content/60 transition-all duration-200 hover:bg-base-content/5 hover:text-base-content"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="text-[17px]" />

                      {item.title}
                    </span>

                    <FiChevronDown
                      className={`text-sm transition-transform duration-200 ${
                        portfolioOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {portfolioOpen && (
                    <div className="mt-1 space-y-1 pl-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        const active = isActive(child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                              active
                                ? "bg-primary text-primary-content"
                                : "text-base-content/50 hover:bg-base-content/5 hover:text-base-content"
                            }`}
                          >
                            <ChildIcon className="text-[15px]" />

                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            {
              /* Normal menu */
            }
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-content"
                    : "text-base-content/60 hover:bg-base-content/5 hover:text-base-content"
                }`}
              >
                <Icon className="text-[17px]" />

                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-base-content/10 p-3">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-base-content/50 transition-all hover:bg-base-content/5 hover:text-base-content"
        >
          <FiLogOut className="text-[17px]" />
          Back to Website
        </Link>
      </div>
    </>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-base-content/10 bg-base-100 lg:flex">
        {sidebarContent}
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
