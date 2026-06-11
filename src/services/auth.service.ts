import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { userSchema } from "@/schemas/auth.schema";
import type { User } from "@/types";

export const authService = {
  login: async (data: { email: string; password: string }): Promise<User> => {
    const response = await api.post("/auth/login", data);
    return validateResponse(userSchema, response.data.user);
  },

  register: async (data: { name: string; email: string; password: string; role: "user" | "company" }): Promise<User> => {
    const response = await api.post("/auth/register", data);
    return validateResponse(userSchema, response.data.user);
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return validateResponse(userSchema, response.data.user ?? response.data);
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout", {});
  },
};
