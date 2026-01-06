// domain/example.repository.ts
import { http } from "@/src/core/api/http-client"
import { ExampleList } from "@/src/modules/v1/example/domains/example.list"

interface ExampleResponseItem {
  id: number
  name: string
  attachment: string
  created_at: string
  updated_at: string
}

interface ExampleResponseData {
  items: ExampleResponseItem[]
  pagination: any
  access: any
}

export const exampleRepository = {
  async getAll(page: number, perPage: number): Promise<ExampleList> {
    const res = await http<ExampleResponseData>(
      `/examples?page=${page}&per_page=${perPage}`
    )

    const data: ExampleList = {
      items: res.items?.map((item) => ({
        id: item.id,
        name: item.name,
        attachment: item.attachment,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) ?? [],
      pagination: res.pagination ?? {},
      access: res.access ?? {},
    }

    return data
  },
}
