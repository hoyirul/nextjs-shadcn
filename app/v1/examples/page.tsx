// app/v1/examples/page.tsx
import ExamplePage from "@/src/modules/v1/example/presentations/ExamplePage"
import { MainLayout } from "@/src/shared/layouts/MainLayout"

export default function Page() {
  return (
    <MainLayout title="Examples">
      <ExamplePage />
    </MainLayout>
  )
}