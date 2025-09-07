
export type Transaction = {
  id: number;
  title: string;
  category?: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
};


export type TransactionFormData = {
  title: string;
  category: string;
  amount: string;
  type: 'expense' | 'income';
  date: string;
};
