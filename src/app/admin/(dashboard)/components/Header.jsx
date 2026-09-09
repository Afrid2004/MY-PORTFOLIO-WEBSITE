"use client";

import React, { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
} from "react-icons/fi";

const Header = ({ setSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    setProfileOpen(false);
    await signOut({
      callbackUrl: "/admin/login",
    });
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-base-content/10 bg-base-100/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left menu bar */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-base-content/10 text-base-content/60 transition-all hover:bg-base-content/5 hover:text-base-content lg:hidden"
          >
            <FiMenu size={19} />
          </button>

          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-base-content/10 bg-base-200 px-3 py-2 sm:flex">
            <FiSearch className="text-sm text-base-content/40" />

            <input
              type="text"
              placeholder="Search..."
              className="w-32 bg-transparent text-xs outline-none placeholder:text-base-content/35 md:w-48"
            />

            <span className="hidden rounded-md border border-base-content/10 px-1.5 py-0.5 text-[9px] text-base-content/30 md:block">
              Ctrl K
            </span>
          </div>

          {/* Mobile Title */}
          <div className="sm:hidden">
            <h1 className="text-sm font-semibold">Admin Panel</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-base-content/50 transition-all hover:bg-base-content/5 hover:text-base-content"
          >
            <FiBell size={18} />

            <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          {/* Divider */}
          <div className="mx-1 h-7 w-px bg-base-content/10" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition-all hover:bg-base-content/5"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-content">
                FA
              </div>

              {/* User Info */}
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium">Faisal Afrid</p>

                <p className="text-[10px] text-base-content/40">
                  Administrator
                </p>
              </div>

              {/* Arrow */}
              <FiChevronDown
                size={15}
                className={`hidden text-base-content/30 transition-transform duration-200 sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-52 overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 p-1.5 shadow-xl shadow-black/10">
                {/* Profile Header */}
                <div className="mb-1 flex items-center gap-3 rounded-xl bg-base-200 px-3 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-content">
                    FA
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">Faisal Afrid</p>

                    <p className="truncate text-[10px] text-base-content/40">
                      Administrator
                    </p>
                  </div>
                </div>

                {/* Profile */}
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-base-content/60 transition-all hover:bg-base-content/5 hover:text-base-content"
                >
                  <FiUser size={16} />
                  Profile
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-red-400 transition-all hover:bg-red-500/10 hover:text-red-400"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
