// src/core/config.ts
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!, // pakai nama sesuai .env
    version: process.env.NEXT_PUBLIC_API_VERSION ?? "v1",
    timeout: 15000,
  },
  locale: {
    default: process.env.NEXT_PUBLIC_APP_LANGUAGE ?? "id",
  },
  environment: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
}

