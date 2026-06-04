import { z } from "zod/v4";

export const updateProfileSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .trim(),
  email: z
    .string({ message: "Email é obrigatório" })
    .email("Email inválido")
    .trim()
    .toLowerCase(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Senha atual é obrigatória" })
      .min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string({ message: "Nova senha é obrigatória" })
      .min(8, "Nova senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Nova senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Nova senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Nova senha deve conter pelo menos um número"),
    confirmPassword: z
      .string({ message: "Confirmação de senha é obrigatória" })
      .min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
