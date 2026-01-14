// src/modules/v1/example/usecases/example.usecase.ts
import { ExampleRepository } from "@/src/modules/v1/example/repositories/example.repository"
import { Example } from "@/src/modules/v1/example/domains/example.entity"
import { ApiResponse } from "@/src/core/api/types"

export class ExampleUseCase {
  constructor(private readonly repo: ExampleRepository = new ExampleRepository()) {}

  // 📄 List all examples (pagination + search)
  async getAll(page: number, per_page: number, keywords: string = "") {
    return await this.repo.getAll(page, per_page, keywords)
  }

  // 👁 Show single example
  async getById(id: number): Promise<ApiResponse<Example>> {
    return await this.repo.getById(id)
  }

  // ✏️ Create new example
  async create(payload: { name: string; attachment?: File | string }) {
    return await this.repo.create(payload)
  }

  // 🔄 Update example
  async update(id: number, payload: { name?: string; attachment?: File | string }): Promise<ApiResponse<Example>> {
    return await this.repo.update(id, payload)
  }

  // 🗑 Delete example
  async delete(id: number): Promise<ApiResponse<Example>> {
    return await this.repo.delete(id)
  }

  // ♻️ Restore example
  async restore(id: number): Promise<ApiResponse<Example>> {
    return await this.repo.restore(id)
  }

  // ✅ Approval action
  async approvalAction(id: number, actionCode: string): Promise<ApiResponse<Example>> {
    return await this.repo.approvalAction(id, actionCode)
  }
}
