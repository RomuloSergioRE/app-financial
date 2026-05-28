export interface Category {
  id: number;
  name: string;
  type: "income" | "expense" | "both";
  color?: string;
  icon?: string;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  type: "income" | "expense" | "both";
  color?: string;
  icon?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}
