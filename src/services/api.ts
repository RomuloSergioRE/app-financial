import axios from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register")
    ) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.endsWith("/login") &&
          !window.location.pathname.endsWith("/register")
        ) {
          const locale = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/)?.[1] ?? "pt-BR";
          window.location.href = `/${locale}/login`;
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
