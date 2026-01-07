// app/dashboard/layout.tsx (server component)
import Protected from "./protected"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Protected>{children}</Protected>
}
