// app/v1/auth/login/page.tsx
import Guest from "./guest"
import LoginPage from "@/src/modules/v1/auth/presentations/LoginPage"

export default function Login() {
  return (
    <Guest>
      <LoginPage />
    </Guest>
  )
}
