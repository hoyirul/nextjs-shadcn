// src/shared/partials/Header.tsx
"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export function Header({
  onMenuClick,
  title = "Dashboard",
}: HeaderProps) {
  // Dummy user data; replace with actual user fetching logic
  return (
    <>

      <div className="flex flex-col gap-[6px] w-full">
        {/* Top Header */}
        <header className="bg-white min-h-[60px] lg:h-[80px] flex items-center justify-between px-4 lg:px-[27px] py-4 lg:py-[38px]">
          {/* Title */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden -ml-2"
            >
              <Menu className="size-6" />
            </Button>
            <h1 className="text-black text-lg lg:text-2xl font-bold leading-normal">{title}</h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Notification Bell */}
            {/* <NotificationBell /> */}

            {/* User Profile */}
            <div className="flex items-center gap-2 lg:gap-[15px]">
              <div className="relative size-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* Replace with actual user avatar logic */}
                <User className="size-5 text-gray-400" /> 
              </div>
              <span className="hidden sm:block text-black text-sm lg:text-base font-semibold text-center whitespace-nowrap">
                John Doe
              </span>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
