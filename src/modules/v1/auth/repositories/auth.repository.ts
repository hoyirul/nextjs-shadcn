import { http } from "@/src/core/api/http-client";
import { LoginResponse } from "@/src/modules/v1/auth/domains/auth.entity";
export interface LoginPayload {
  email: string;
  password: string;
}

export class AuthRepository {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await http<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload, 
    });

    return response.data!;
  }
}
