import { message } from "antd";
import { RequestOptions } from "./request.d";

const ERROR_MESSAGES: Record<number, string> = {
  400: "请求错误",
  401: "未授权，请登录",
  403: "拒绝访问",
  404: "请求地址不存在",
  500: "服务器内部错误",
};

/**
 * @description request错误处理函数
 * @param error
 * @param options
 * @returns
 */
export function handleRequestError(
  error: any,
  options: RequestOptions = {}
): void {
  const { showError = true, errorMessage } = options;

  if (!showError) return;

  let msg = errorMessage || "请求失败";

  if (error.response) {
    const { status } = error.response;
    msg = ERROR_MESSAGES[status] || `连接错误${status}`;
  }

  message.error(msg);
}
