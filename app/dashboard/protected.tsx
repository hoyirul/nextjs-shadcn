// app/dashboard/Protected.tsx (ASYNC)
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
