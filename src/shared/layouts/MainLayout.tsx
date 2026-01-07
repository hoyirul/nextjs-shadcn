// src/shared/layouts/MainLayout.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/src/shared/partials/Sidebar";
import { Header } from "@/src/shared/partials/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="min-h-screen flex bg-[#f9fbff]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right section */}
      <div className="flex-1 flex flex-col lg:ml-[280px]">
        {/* Header */}
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

