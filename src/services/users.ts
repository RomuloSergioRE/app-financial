import api from "./api";
import type { User } from "@/types";

interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  getProfile: () => api.get<User>("/auth/me"),

  updateProfile: (data: UpdateProfileRequest) =>
    api.put<User>("/auth/profile", data),

  updatePassword: (data: UpdatePasswordRequest) =>
    api.put("/auth/password", data),
};
