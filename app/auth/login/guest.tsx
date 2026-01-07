// app/v1/auth/Guest.tsx
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
