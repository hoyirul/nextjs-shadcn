// app/v1/examples/create/page.tsx
import CreateExamplePage from "@/src/modules/v1/example/presentations/ExampleCreate"
import { MainLayout } from "@/src/shared/layouts/MainLayout"

export default function Page() {
  return (
    <MainLayout title="Create New Example">
      <CreateExamplePage />
    </MainLayout>
  )
}