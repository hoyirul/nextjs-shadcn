import { http } from "@/src/core/api/http-client"
import { LoginResponse } from "../domains/auth.entity"

export interface LoginPayload {
  email: string
  password: string
}

export class AuthRepository {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await http<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
    return response.data
  }
}
