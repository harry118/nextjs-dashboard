/**
 * 请求配置接口
 */
export interface RequestOptions {
  /** 是否显示错误信息 */
  showError?: boolean;
  /** 自定义错误信息 */
  errorMessage?: string;
  /** 是否显示成功信息 */
  showSuccess?: boolean;
  /** 自定义成功信息 */
  successMessage?: string;
  /** 请求头配置 */
  headers?: Record<string, string>;
  /** 请求超时时间（毫秒） */
  timeout?: number;
}

/**
 * 响应数据接口
 */
export interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: number;
  /** 数据 */
  data: T;
  /** 消息 */
  message: string;
}

/**
 * 错误响应接口
 */
export interface ErrorResponse {
  /** 错误码 */
  code: number;
  /** 错误信息 */
  message: string;
}
