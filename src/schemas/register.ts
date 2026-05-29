import { z } from "zod/v4";

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
      .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
    confirmPassword: z
      .string({ message: "Confirmação de senha é obrigatória" })
      .min(8, "Confirmação de senha deve ter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
