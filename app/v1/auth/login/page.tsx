// app/v1/auth/login/page.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const branding = {
    systemName: 'NSO Application', // New Store Opening
    systemDescription: 'A comprehensive system to manage and streamline the process of opening new stores, ensuring efficiency and consistency across all locations. From site selection to grand opening, our platform provides the tools and resources needed for a successful launch.',
    primaryColor: '#2563eb',
    secondaryColor: '#ec4899',
    logoUrl: '/assets/cbc954a6519ff310baa5cbff4ac5fc4ac8ac03d0.png', // optional
  }

  interface LastAccount {
    email: string;
    name: string;
    lastLogin: string;
  }

  const [accounts, setAccounts] = useState<LastAccount[]>([
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
  ]);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 h-[40vh] lg:h-[50vh]"
        style={{ backgroundColor: branding.primaryColor }}
      />

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Left text */}
        <div className="absolute left-[86px] top-[80px] w-[513px] text-white">
          <h1 className="text-[24px] font-semibold mb-2">Sign in to</h1>
          <h2 className="text-[20px] font-medium mb-4">
            {branding.systemName}
          </h2>
          <p className="text-[14px] leading-relaxed text-justify">
            {branding.systemDescription}
          </p>
        </div>

        {/* Form */}
        <div className="absolute right-[116px] top-1/2 -translate-y-1/2 w-[508px]">
          <div className="bg-white rounded-[25px] border p-[34px] shadow">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              {branding.logoUrl && (
                <Image
                  src={branding.logoUrl}
                  alt="Logo"
                  width={43}
                  height={31}
                />
              )}
              <div>
                <p className="text-[13px] font-semibold text-slate-700">
                  {branding.systemName}
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
                  style={{ color: branding.secondaryColor }}
                >
                  {branding.systemName}
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
                  className={`border rounded-md py-5 focus-visible:ring-0 mt-2`}
                />
              </div>

              <div>
                <label className="text-[12px] text-slate-600">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`border rounded-md py-5 focus-visible:ring-0 mt-2 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 p-1 mt-1"
                    style={{ color: branding.secondaryColor }}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
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
                style={{ color: branding.secondaryColor }}
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <Button
              className="w-full mt-8 text-white py-6 font-semibold text-[16px]"
              style={{ backgroundColor: branding.primaryColor }}
            >
              Sign in
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-[12px] text-slate-400 mt-6">
            <p>© 2024 My Company</p>
            <p>Version 1.0.0</p>
          </div>
        </div>

        {/* Last Account - LEFT SIDE */}
        {accounts.length > 0 && (
          <div className="absolute left-[86px] top-[calc(50vh+40px)] w-[520px]">
            <p className="text-[16px] text-[#243644] mb-[30px]">
              Login as
            </p>

            <div className="flex gap-[24px]">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="bg-white h-[164px] w-[145px] rounded-[9px] p-[15px]
                  cursor-pointer shadow-sm hover:shadow-md transition
                  flex flex-col items-center justify-between"
                >
                  {/* Avatar */}
                  <div className="w-[76px] h-[76px] rounded-full bg-blue-500
                    flex items-center justify-center text-white
                    text-2xl font-semibold mt-2">
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
          <h2 className="text-[16px]">{branding.systemName}</h2>
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
              style={{ backgroundColor: branding.primaryColor }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}