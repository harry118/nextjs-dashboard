import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

import { RequestOptions, ApiResponse } from "./request.d";
import { handleRequestError } from "./error-handler";

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 设置请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 设置响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response?.data,
  (error) => Promise.reject(error)
);

// 请求函数
async function request<T>(
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const { showSuccess = false, successMessage, headers, timeout } = options;

    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: { ...config.headers, ...headers },
      timeout: timeout || 10000,
    };

    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.request(
      mergedConfig
    );
    const { data, code, message: msg } = response.data;

    if (code !== 0) {
      throw { code, message: msg };
    }

    if (showSuccess && successMessage) {
      message.success(successMessage);
    }

    return data;
  } catch (error) {
    handleRequestError(error, options);
    throw error;
  }
}

// 导出具体的请求方法
export const http = {
  get: <T>(url: string, params?: any, options?: RequestOptions) =>
    request<T>({ method: "GET", url, params }, options),

  post: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>({ method: "POST", url, data }, options),

  put: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>({ method: "PUT", url, data }, options),

  delete: <T>(url: string, params?: any, options?: RequestOptions) =>
    request<T>({ method: "DELETE", url, params }, options),
};
