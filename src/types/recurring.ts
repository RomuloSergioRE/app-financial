import type { z } from "zod/v4";
import type { recurringSchema, createRecurringSchema } from "@/schemas/recurring.schema";

export type Recurring = z.infer<typeof recurringSchema>;
export type CreateRecurringRequest = z.infer<typeof createRecurringSchema>;
export type UpdateRecurringRequest = Partial<CreateRecurringRequest>;
