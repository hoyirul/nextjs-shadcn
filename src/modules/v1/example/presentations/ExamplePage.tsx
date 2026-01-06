// src/modules/v1/example/presentations/ExamplePage.tsx
import { getExamplesUsecase } from "@/src/modules/v1/example/usecases/example.usecase"
import { ExampleTable } from "./components/ExampleTable"

export default async function ExamplePage() {
  const data = await getExamplesUsecase(1, 10)

  return (
      <>
        <ExampleTable
          initialItems={data.items}
          initialPagination={{
            currentPage: data.pagination.current_page,
            perPage: data.pagination.per_page,
            totalPages: data.pagination.total_pages,
            total: data.pagination.total,
          }}
          access={data.access}
        />
      </>
  )
}