"use client";

import React, { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-base-200">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="relative flex h-screen flex-col lg:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Content */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>

      {/* Top Left Glow */}
      <div className="pointer-events-none absolute left-0 top-0 z-50">
        <div
          className="
            h-75 w-75
            rounded-full
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
            blur-[100px]
            md:h-100 md:w-100 md:blur-[140px]
          "
        />
      </div>

      {/* Bottom Right Glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-50">
        <div
          className="
            h-75 w-75
            rounded-full
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
            blur-[100px]
            md:h-100 md:w-100 md:blur-[140px]
          "
        />
      </div>
    </div>
  );
}
