// src/core/api/http-client.ts
import axios, { AxiosRequestConfig } from "axios"
import { config } from "../config"
import { ApiError } from "./errors"
import { ApiResponse } from "./types"

type HttpOptions = AxiosRequestConfig & {
  locale?: string
  body?: any
}

const axiosInstance = axios.create({
  baseURL: `${config.api.baseUrl}/${config.api.version}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ penting kalau pakai auth / cookie
})

export async function http<T>(
  path: string,
  options?: HttpOptions
): Promise<T> {
  try {
    const res = await axiosInstance.request<ApiResponse<T>>({
      url: path,
      method: options?.method ?? "GET",
      headers: {
        "Accept-Language": options?.locale ?? config.locale.default,
        ...options?.headers,
      },
      data: options?.body ? JSON.parse(options.body as string) : undefined,
      params: options?.params,
    })

    const json = res.data

    if (!json.success) {
      throw new ApiError(
        json.code ?? "API_ERROR",
        json.message ?? "Request failed",
        res.status
      )
    }

    if (json.data === undefined || json.data === null) {
      return {} as T
    }

    return json.data
  } catch (error: any) {
    // 🔥 Axios error handling
    if (error.response) {
      const res = error.response
      throw new ApiError(
        res.data?.code ?? "API_ERROR",
        res.data?.message ?? "Request failed",
        res.status
      )
    }

    throw new ApiError(
      "NETWORK_ERROR",
      error.message ?? "Network error",
      0
    )
  }
}
