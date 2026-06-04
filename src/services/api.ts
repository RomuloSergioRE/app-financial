import axios from "axios";
import { cookie } from "@/lib/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = cookie.getToken("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshTokenValue = cookie.getToken("refresh_token");
      if (refreshTokenValue) {
        try {
          const { data } = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refreshToken: refreshTokenValue }
          );
          cookie.setToken("jwt_token", data.accessToken, 7);
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(error.config);
        } catch {
          cookie.removeToken("jwt_token");
          cookie.removeToken("refresh_token");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
