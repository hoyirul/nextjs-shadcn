// src/core/api/types.ts
export interface ApiResponse<T> {
  code: string
  success: boolean
  message: string
  data: T
}
