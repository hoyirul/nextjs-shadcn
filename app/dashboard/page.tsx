// app/dashboard/page.tsx (server component)
import { MainLayout } from '@/src/shared/layouts/MainLayout'

export default function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    </MainLayout>
  )
}