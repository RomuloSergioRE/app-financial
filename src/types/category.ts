import type { z } from "zod/v4";
import type { categorySchema, createCategorySchema } from "@/schemas/category.schema";

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;
