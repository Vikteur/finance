import { useState, useMemo } from 'react';
import { Transaction } from '../types/transaction';

export interface Filters {
  title: string;
  category: string;
  amount: {
    min: string;
    max: string;
  };
}

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<Filters>({
    title: '',
    category: '',
    amount: {
      min: '',
      max: ''
    }
  });

  const filteredTransactions = useMemo(() => {
    // Ensure transactions is an array
    if (!Array.isArray(transactions)) {
      return [];
    }

    return transactions.filter(transaction => {
      const matchesTitle = transaction.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesCategory = transaction.category?.toLowerCase().includes(filters.category.toLowerCase()) ?? true;
      const matchesAmount = (
        (!filters.amount.min || transaction.amount >= Number(filters.amount.min)) &&
        (!filters.amount.max || transaction.amount <= Number(filters.amount.max))
      );
      return matchesTitle && matchesCategory && matchesAmount;
    });
  }, [transactions, filters]);

  const clearFilters = () => {
    setFilters({
      title: '',
      category: '',
      amount: {
        min: '',
        max: ''
      }
    });
  };

  return { filters, setFilters, clearFilters, filteredTransactions };
}
