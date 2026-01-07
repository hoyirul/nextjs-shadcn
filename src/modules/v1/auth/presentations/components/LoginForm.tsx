// src/
'use client'

import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

interface LoginFormProps {
  branding?: {
    systemName: string;
    systemDescription: string;
    primaryColor: string | string[];
    secondaryColor: string;
    logoUrl?: string;
  };
  accounts?: {
    email: string;
    name: string;
    lastLogin: string;
  }[];
  email?: string;
  password?: string;
  showPassword?: boolean;
  onShowPasswordChange?: (show: boolean) => void;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
  onSubmit?: () => void;
  formErrors?: Record<string, string>;
  loading?: boolean;
}

export function LoginForm({ 
  branding, 
  accounts,
  email,
  password,
  showPassword,
  onShowPasswordChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  formErrors,
  loading, 
}: LoginFormProps) {
  const [isHover, setIsHover] = useState(false)
  const getButtonBackground = (reverse = false) => {
    if (Array.isArray(branding!.primaryColor)) {
      const colors = reverse
        ? [...branding!.primaryColor].reverse()
        : branding!.primaryColor

      return `linear-gradient(90deg, ${colors.join(', ')})`
    }

    return branding!.primaryColor
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] lg:h-[50vh]"
        style={{ background: Array.isArray(branding!.primaryColor) ? `linear-gradient(90deg, ${branding!.primaryColor.join(', ')})` : branding!.primaryColor }}
      />

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Left text */}
        <div className="absolute left-[86px] top-[100px] w-[513px] text-white">
          <h1 className="text-[24px] font-semibold mb-2">Sign in to</h1>
          <h2 className="text-[40px] font-semibold mb-2">
            {branding!.systemName}
          </h2>
          <p className="text-[14px] leading-relaxed font-medium text-justify">
            {branding!.systemDescription}
          </p>
        </div>

        {/* Form */}
        <div className="absolute right-[116px] top-1/2 -translate-y-1/2 w-[508px]">
          <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit?.()
          }}>
            <div className="bg-white rounded-[25px] border p-[34px] shadow">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                {branding!.logoUrl && (
                  <Image
                    src={branding!.logoUrl}
                    alt="Logo"
                    width={43}
                    height={31}
                  />
                )}
                <div>
                  <p className="text-[13px] font-semibold text-slate-700">
                    {branding!.systemName}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Internal System
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <p className="text-[16px] text-slate-700">
                  Welcome to{' '}
                  <span
                    className="font-semibold"
                    style={{ color: branding!.secondaryColor }}
                  >
                    {branding!.systemName}
                  </span>
                </p>
                <h2 className="text-[24px] font-medium text-slate-800">
                  Sign in
                </h2>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] text-slate-600">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onEmailChange && onEmailChange(e.target.value)}
                    className={`border rounded-md py-5 focus-visible:ring-0 mt-2 ${formErrors?.email ? 'border-red-500' : ''}`}
                  />
                  {formErrors!.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors!.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[12px] text-slate-600">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => onPasswordChange && onPasswordChange(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`border rounded-md py-5 focus-visible:ring-0 mt-2 pr-10 ${formErrors?.password ? 'border-red-500' : ''}`}
                    />
                    {formErrors!.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors!.password}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => onShowPasswordChange && onShowPasswordChange(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 p-1 mt-1"
                      style={{ color: branding!.secondaryColor }}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className='cursor-pointer' />
                      ) : (
                        <Eye size={18} className='cursor-pointer' />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember */}
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-[12px] text-slate-700">
                    Remember me
                  </span>
                </div>
                <a
                  href="#"
                  className="text-[12px]"
                  style={{ color: branding!.secondaryColor }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <Button
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="w-full mt-8 text-white py-6 font-semibold text-[16px]
                          cursor-pointer transition-all duration-300
                          hover:opacity-90 disabled:opacity-60"
                style={{
                  background: getButtonBackground(isHover),
                }}
              >
                Sign in
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-[12px] text-slate-400 mt-6">
            <p>© 2024 My Company</p>
            <p>Version 1.0.0</p>
          </div>
        </div>

        {/* Last Account - LEFT SIDE */}
        {accounts!.length > 0 && (
          <div className="absolute left-[86px] top-[calc(50vh+30px)] w-[520px]">
            <p className="text-[16px] font-semibold text-[#243644] mb-[15px]">
              Login as
            </p>

            <div className="flex gap-[15px]">
              {accounts!.map((account, index) => (
                <div
                  key={index}
                  className="bg-white h-[164px] w-[175px] rounded-[9px] p-[15px]
                  cursor-pointer shadow-sm hover:shadow-md transition
                  flex flex-col items-center justify-between"
                >
                  {/* Avatar */}
                  <div className="w-[76px] h-[76px] rounded-full bg-gray-500
                    flex items-center justify-center text-white
                    text-2xl font-semibold mt-2"
                    >
                    {account.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <p className="text-[15px] font-medium text-[#243644]">
                      {account.name}
                    </p>
                    <p className="text-[12px] text-[#a4b4c8]">
                      Last login{' '}
                      {new Date(account.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden relative z-10 min-h-screen flex flex-col">
        <div className="px-6 pt-10 text-white">
          <h1 className="text-[20px] font-semibold">Sign in to</h1>
          <h2 className="text-[16px]">{branding!.systemName}</h2>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white rounded-[20px] border p-6 w-full max-w-md">
            <h2 className="text-[22px] font-medium mb-6 text-slate-800">
              Sign in
            </h2>

            <div className="space-y-5">
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
            </div>

            <Button
              className="w-full mt-6 text-white"
              style={{ background: Array.isArray(branding!.primaryColor) ? `linear-gradient(90deg, ${branding!.primaryColor.join(', ')})` : branding!.primaryColor }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}