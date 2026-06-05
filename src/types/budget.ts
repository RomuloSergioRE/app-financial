import type { z } from "zod/v4";
import type { budgetSchema, createBudgetSchema } from "@/schemas/budget.schema";

export type Budget = z.infer<typeof budgetSchema>;
export type CreateBudgetRequest = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetRequest = Partial<CreateBudgetRequest>;
