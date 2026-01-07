import { AuthRepository } from "@/src/modules/v1/auth/repositories/auth.repository"
import { LoginPayload } from "@/src/modules/v1/auth/repositories/auth.repository"
import { LoginResponse } from "@/src/modules/v1/auth/domains/auth.entity"

export class AuthUseCase {
  constructor(
    private readonly authRepo: AuthRepository = new AuthRepository()
  ) {}

  async login(payload: LoginPayload): Promise<LoginResponse> {
    return await this.authRepo.login(payload)
  }
}
