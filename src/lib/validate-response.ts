import { z } from "zod/v4";
import { logger } from "@/lib/logger";

export function validateResponse<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    logger.error("[API Validation Error]", result.error.issues);
    throw new Error("Resposta da API inválida");
  }
  return result.data;
}
