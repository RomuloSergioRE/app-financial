import type { z } from "zod/v4";
import type { userSchema, authResponseSchema, loginSchema, registerSchema } from "@/schemas/auth.schema";

export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = Omit<z.infer<typeof registerSchema>, "confirmPassword">;
