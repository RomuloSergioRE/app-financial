import { z } from "zod/v4";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Nome é obrigatório" })
      .min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
    password: z
      .string({ message: "Senha é obrigatória" })
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string({ message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
