import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório" })
    .email("Email inválido")
    .trim()
    .toLowerCase(),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
