import { useState, useMemo } from 'react';
import { Transaction } from '../types/transaction';

export interface SortConfig {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}

export function useTransactionSorting(transactions: Transaction[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc'
  });

  const sortedTransactions = useMemo(() => {
    // Ensure transactions is an array
    if (!Array.isArray(transactions)) {
      return [];
    }

    return [...transactions].sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [transactions, sortConfig]);

  const requestSort = (key: keyof Transaction) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return { sortConfig, requestSort, sortedTransactions };
}
