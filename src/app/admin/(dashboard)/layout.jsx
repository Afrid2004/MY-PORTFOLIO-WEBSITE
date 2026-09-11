"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200">
      {/* Main Content */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative lg:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>

      {/* Top Left Glow */}
      <div className="pointer-events-none absolute left-0 top-0 z-50">
        <div
          className="
            h-75 w-75
            md:h-100 md:w-100
            rounded-full
            blur-[100px]
            md:blur-[140px]
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
          "
        />
      </div>

      {/* Bottom Right Glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-50">
        <div
          className="
            h-75 w-75
            md:h-100 md:w-100
            rounded-full
            blur-[100px]
            md:blur-[140px]
            bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
          "
        />
      </div>
    </div>
  );
}
