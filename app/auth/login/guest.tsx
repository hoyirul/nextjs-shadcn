// app/v1/auth/Guest.tsx
// START — PRODUCTION ONLY
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function Guest({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  if (token) {
    redirect("/dashboard")
  }

  return <>{children}</>
}
// END — PRODUCTION ONLY

// START — DEVELOPMENT ONLY
// "use client";

// import { ReactNode, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Guest({ children }: { children: ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (token) {
//       router.replace("/dashboard");
//     }
//   }, []);

//   return <>{children}</>;
// }
// END — DEVELOPMENT ONLY
