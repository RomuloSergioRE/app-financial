import { z } from "zod/v4";

export const userSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "admin", "company"]),
  plan: z.enum(["free", "pro", "enterprise"]).default("free"),
  status: z.enum(["active", "inactive", "suspended"]),
  avatarUrl: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserDTO = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthResponseDTO = z.infer<typeof authResponseSchema>;

export const loginSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido").trim().toLowerCase(),
  password: z.string({ message: "Senha é obrigatória" }).min(1, "Senha é obrigatória"),
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Nome é obrigatório" })
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .trim(),
    email: z
      .string({ message: "Email é obrigatório" })
      .email("Email inválido")
      .trim()
      .toLowerCase(),
    password: z
      .string({ message: "Senha é obrigatória" })
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos um número")
      .regex(/[!@#$%^&*(),.?":{}|<>_\-+=\[\]]/, "Senha deve conter pelo menos um caractere especial"),
    confirmPassword: z
      .string({ message: "Confirmação de senha é obrigatória" })
      .min(8, "Confirmação de senha deve ter no mínimo 8 caracteres"),
    role: z.enum(["user", "company"]).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterDTO = z.infer<typeof registerSchema>;
