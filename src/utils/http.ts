import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
});

const ACCESS_TOKEN = "ACCESS_TOKEN";

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem(ACCESS_TOKEN);

  return config;
});

export default http;
