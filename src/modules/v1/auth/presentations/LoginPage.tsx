// src/modules/v1/auth/presentations/LoginPage.tsx
'use client'

import { useState } from 'react'
import { AuthUseCase } from '@/src/modules/v1/auth/usecases/auth.usecase'
import { LoginForm } from './components/LoginForm'
import { useRouter } from 'next/navigation'
import { ApiError } from '@/src/core/api/errors'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const authUseCase = new AuthUseCase()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleLogin = async () => {
    setLoading(true)
    try {
      await authUseCase.login({
        email,
        password,
      })

      toast.success('Login berhasil')
      router.push('/dashboard')
    } catch (err: any) {
      if (err instanceof ApiError) {
        toast.error(err.message)

        if (err.errors) {
          setFormErrors(err.errors)
        }
      } else {
        toast.error('Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }

  const branding = {
    systemName: 'NSO Application', // New Store Opening
    systemDescription: 'A comprehensive system to manage and streamline the process of opening new stores, ensuring efficiency and consistency across all locations. From site selection to grand opening, our platform provides the tools and resources needed for a successful launch.',
    primaryColor: ['#ec4899', '#3b82f6'],
    secondaryColor: '#ec4899',
    logoUrl: '/assets/cbc954a6519ff310baa5cbff4ac5fc4ac8ac03d0.png', // optional
  }

  interface LastAccount {
    email: string;
    name: string;
    lastLogin: string;
  }

  const accounts: LastAccount[] = [
    {
      email: 'admin@mail.com',
      name: 'Super Admin',
      lastLogin: new Date().toISOString(),
    },
    {
      email: 'user@mail.com',
      name: 'John Doe',
      lastLogin: '2024-12-01T10:00:00Z',
    },
  ];

  return (
    <LoginForm
      branding={branding}
      accounts={accounts}
      email={email}
      password={password}
      showPassword={showPassword}
      onShowPasswordChange={setShowPassword}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
      formErrors={formErrors}
      loading={loading}
    />
  )
}