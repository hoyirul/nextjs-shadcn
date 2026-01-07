// src/shared/wrappers/AuthGuard.tsx
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
  isAuthenticated: boolean
}

export function AuthGuard({ children, isAuthenticated }: Props) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return <>{children}</>
}
