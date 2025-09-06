export type Transaction = {
  id: number;
  title: string;
  description?: string;
  amount: number;
  date: Date;
};

export type TransactionFormData = {
  title: string;
  description: string;
  amount: string;
  type: 'expense' | 'income';
  date: string;
};
