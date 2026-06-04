import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { authResponseSchema, userSchema } from "@/schemas/auth.schema";
import type { AuthResponse, User } from "@/types";

export const authService = {
  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return validateResponse(authResponseSchema, response.data);
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return validateResponse(authResponseSchema, response.data);
  },

  refresh: async (
    refreshToken: string
  ): Promise<AuthResponse> => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return validateResponse(authResponseSchema, response.data);
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return validateResponse(userSchema, response.data);
  },
};
