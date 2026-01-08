// src/core/api/http-client.ts
import { config } from "@/src/core/config";
import { ApiError } from "./errors";
import { ApiResponse } from "./types";

type HttpOptions = {
  method?: string;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  locale?: string;
};

export async function http<T = any>(
  path: string,
  options: HttpOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const url = new URL(`${config.api.baseUrl}/${config.api.version}${path}`);
    if (options.params) {
      Object.entries(options.params).forEach(([key, val]) =>
        url.searchParams.append(key, String(val))
      );
    }

    const headers: Record<string, string> = {
      "Accept-Language": options.locale ?? config.locale.default,
      ...options.headers,
    };

    let body: any;
    if (options.body) {
      if (options.body instanceof FormData) {
        body = options.body;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(options.body);
      }
    }

    const res = await fetch(url.toString(), {
      method: options.method ?? "GET",
      headers,
      body,
      credentials: "include", 
    });

    // LOG REQUEST AND RESPONSE FOR DEBUGGING
    console.log("HTTP Request:", {
      url: url.toString(),
      method: options.method ?? "GET",
      headers,
      body: options.body,
    });
    console.log("HTTP Response:", {
      status: res.status,
      statusText: res.statusText,
    });

    const json: ApiResponse<T> = await res.json();

    if (!json.success) {
      console.error("API Error:", json);
      throw new ApiError(
        json.code ?? "API_ERROR",
        json.message ?? "Request failed",
        res.status,
        (json as any).errors
      );
    }

    return json;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;

    console.error("Network or unknown error:", error);
    throw new ApiError(
      "NETWORK_ERROR",
      error.message ?? "Network error",
      0
    );
  }
}
