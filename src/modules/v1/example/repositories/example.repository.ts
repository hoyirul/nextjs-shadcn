// domain/example.repository.ts
import { http } from "@/src/core/api/http-client"
import { ExampleList } from "@/src/modules/v1/example/domains/example.list"
import { Example } from "@/src/modules/v1/example/domains/example.entity"
import { ApiResponse } from "@/src/core/api/types"

export class ExampleRepository {
  private basePath: string = "/examples"
  constructor() {}

  // 📄 Get list with pagination + search
  async getAll(page: number, per_page: number, keywords: string = ""): Promise<ExampleList> {
    const res = await http<ExampleList>(
      `${this.basePath}?page=${page}&per_page=${per_page}&keywords=${keywords}`
    )

    const data: ExampleList = {
      items: res.data!.items ?? [],
      pagination: res.data!.pagination ?? {},
      access: res.data!.access ?? {},
    }

    return data
  }

  // 👁 Show single example
  async getById(id: number): Promise<ApiResponse<Example>> {
    const res = await http<ApiResponse<Example>>(`${this.basePath}/${id}`)
    return res.data!
  }

  // ✏️ Create new example
  async create(payload: { name: string; attachment?: File | string }): Promise<ApiResponse<any>> {
    const formData = new FormData()
    formData.append("name", payload.name)
    if (payload.attachment) formData.append("attachment", payload.attachment as File)

    const res = await http<ApiResponse<any>>(`${this.basePath}`, {
      method: "POST",
      body: formData,
    })

    return res
  }

  // 🔄 Update example
  async update(id: number, payload: { name?: string; attachment?: File | string }): Promise<ApiResponse<any>> {
    const formData = new FormData()
    if (payload.name !== undefined) formData.append("name", payload.name)
    if (payload.attachment !== undefined) formData.append("attachment", payload.attachment as File)

    const res = await http<ApiResponse<any>>(`${this.basePath}/${id}`, {
      method: "PATCH",
      body: formData,
    })

    return res
  }

  // 🗑 Delete example (soft delete)
  async delete(id: number): Promise<ApiResponse<any>> {
    const res = await http<ApiResponse<any>>(`${this.basePath}/${id}`, { method: "DELETE" })
    return res
  }

  // ♻️ Restore soft deleted example
  async restore(id: number): Promise<ApiResponse<any>> {
    const res = await http<ApiResponse<any>>(`${this.basePath}/${id}/restore`, { method: "POST" })
    return res
  }
}