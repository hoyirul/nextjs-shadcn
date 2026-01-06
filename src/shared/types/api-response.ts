// src/shared/types/api-response.ts
export interface ApiResponse<T> {
  items: any
  code: string
  success: boolean
  message: string
  data: T
}
