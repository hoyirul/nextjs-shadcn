// src/core/api/errors.ts
export class ApiError extends Error {
  code: string
  status: number
  errors?: Record<string, string>

  constructor(
    code: string,
    message: string,
    status: number,
    errors?: Record<string, string>
  ) {
    super(message)
    this.code = code
    this.status = status
    this.errors = errors
  }
}
