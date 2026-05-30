export interface Category {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  color?: string;
  icon?: string;
}

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;
