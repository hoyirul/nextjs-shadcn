// src/shared/hooks/use-auth.hook.ts
"use client";

import { useEffect, useState } from "react";
import { http } from "@/src/core/api/http-client";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    http("/auth/me")
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return {
    isAuthenticated,
    isLoading: isAuthenticated === null,
  };
}


