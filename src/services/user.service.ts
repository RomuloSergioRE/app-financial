import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { userSchema } from "@/schemas/auth.schema";
import type { User } from "@/types";

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return validateResponse(userSchema, response.data);
  },

  updateProfile: async (data: { name?: string; email?: string }): Promise<User> => {
    const response = await api.put("/auth/profile", data);
    return validateResponse(userSchema, response.data);
  },

  updatePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await api.put("/auth/password", data);
  },
};
