// src/core/api/http-client.ts
import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config";
import { ApiError } from "./errors";
import { ApiResponse } from "./types";

// Extra HTTP options type
type HttpOptions = AxiosRequestConfig & {
  locale?: string;
  body?: any;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${config.api.baseUrl}/${config.api.version}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for cookie-based auth
});

// Optional: global response interceptor for 401 Unauthorized
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Generic HTTP function for all requests
 */
export async function http<T = any>(
  path: string,
  options?: HttpOptions
): Promise<ApiResponse<T>> {
  try {
    const res = await axiosInstance.request<ApiResponse<T>>({
      url: path,
      method: options?.method ?? "GET",
      headers: {
        "Accept-Language": options?.locale ?? config.locale.default,
        ...options?.headers,
      },
      data: options?.body
        ? typeof options.body === "string"
          ? JSON.parse(options.body)
          : options.body
        : undefined,
      params: options?.params,
    });

    const json = res.data;

    // Throw error if API success flag is false
    if (!json.success) {
      console.error("API Error:", json);
      throw new ApiError(
        json.code ?? "API_ERROR",
        json.message ?? "Request failed",
        res.status,
        (json as any).errors
      );
    }

    // Return full response (message + data), don't replace null data with {}
    return json;
  } catch (error: any) {
    if (error.response) {
      const res = error.response
      console.error("HTTP Error:", res?.data ?? res) // aman, tampilkan yang ada
      throw new ApiError(
        res?.data?.code ?? "API_ERROR",
        res?.data?.message ?? res?.statusText ?? "Request failed",
        res?.status ?? 0,
        res?.data?.errors
      )
    }

    // Network atau unknown error
    console.error("Network or unknown error:", error)
    throw new ApiError(
      "NETWORK_ERROR",
      error.message ?? "Network error",
      0
    )
  }
}
