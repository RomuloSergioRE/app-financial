import type { z } from "zod/v4";
import type { goalSchema, createGoalSchema } from "@/schemas/goal.schema";

export type Goal = z.infer<typeof goalSchema>;
export type CreateGoalRequest = z.infer<typeof createGoalSchema>;
export type UpdateGoalRequest = Partial<CreateGoalRequest>;
