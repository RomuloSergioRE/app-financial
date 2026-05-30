export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "outcome";
  date: string;
  categoryId: string;
  category?: {
    id: string;
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
  type: "income" | "outcome";
  date: string;
  categoryId: string;
}

export interface UpdateTransactionRequest
  extends Partial<CreateTransactionRequest> {}
