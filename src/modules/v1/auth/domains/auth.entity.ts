export interface User {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  user: User
  token_type: string
  access_token: string
  expires_in: number
}
