// app/dashboard/Protected.tsx (ASYNC)

// START FOR PRODUCTION ONLY
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Protected({ children }: { children: ReactNode }) {
  const cookieStore = await cookies(); // async aman di server component
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
// END FOR PRODUCTION ONLY

// START FOR DEVELOPMENT ONLY
// "use client"

// import { ReactNode } from "react"
// import { AuthGuard } from "@/src/shared/wrappers/AuthGuard"
// import { useAuth } from "@/src/shared/hooks/use-auth.hook"

// export default function Protected({ children }: { children: ReactNode }) {
//   const { isAuthenticated } = useAuth()

//   return <AuthGuard isAuthenticated={isAuthenticated}>{children}</AuthGuard>
// }
// // END FOR DEVELOPMENT ONLY
