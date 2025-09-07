import { useState, useMemo } from 'react';
import { Filters, Transaction } from '../types';

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<Filters>({
    title: '',
    category: '',
    amount: {
      min: '',
      max: ''
    }
  });

  const hasActiveFilters = useMemo(() => {
    return filters.title || filters.category || filters.amount.min || filters.amount.max;
  }, [filters]);

  const filteredTransactions = useMemo(() => {
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

  return {
    filters,
    setFilters,
    hasActiveFilters,
    filteredTransactions,
    clearFilters
  };
}
