export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    color?: string;
    icon?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  categoryId: number;
}

export interface UpdateTransactionRequest
  extends Partial<CreateTransactionRequest> {}
