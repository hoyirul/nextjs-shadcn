// src/shared/wrappers/auth-guard.ts
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean | null;
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated]);

  // Belum tau status → jangan ngapa2in dulu
  if (isAuthenticated === null) return null;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}

