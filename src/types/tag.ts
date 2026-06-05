import type { z } from "zod/v4";
import type { tagSchema, createTagSchema } from "@/schemas/tag.schema";

export type Tag = z.infer<typeof tagSchema>;
export type CreateTagRequest = z.infer<typeof createTagSchema>;
export type UpdateTagRequest = Partial<CreateTagRequest>;
