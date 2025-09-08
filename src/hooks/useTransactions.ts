import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types/transaction';
import { transactionService } from '../services/transactionService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load transactions on mount
  useEffect(() => {
    try {
      const loadedTransactions = transactionService.getTransactions();
      setTransactions(loadedTransactions);
      setLoading(false);
    } catch {
      setError('Failed to load transactions');
      setLoading(false);
    }
  }, []);

  // Add transaction
  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      setError(null);
      const newTransaction = transactionService.addTransaction(transaction);
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add transaction';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Update transaction
  const updateTransaction = useCallback(async (id: number, updates: Partial<Omit<Transaction, 'id'>>) => {
    try {
      setError(null);
      const updatedTransaction = transactionService.updateTransaction(id, updates);
      if (updatedTransaction) {
        setTransactions(prev => prev.map(t => t.id === id ? updatedTransaction : t));
        return updatedTransaction;
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update transaction';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Delete transaction
  const deleteTransaction = useCallback(async (id: number) => {
    try {
      setError(null);
      const success = transactionService.deleteTransaction(id);
      if (success) {
        setTransactions(prev => prev.filter(t => t.id !== id));
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete transaction';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Get transaction by ID
  const getTransactionById = useCallback((id: number) => {
    return transactionService.getTransactionById(id);
  }, []);

  // Clear all transactions
  const clearAllTransactions = useCallback(async () => {
    try {
      setError(null);
      transactionService.clearAllTransactions();
      setTransactions([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear transactions';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Get summary data
  const getSummary = useCallback(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return {
      income,
      expenses,
      balance,
      transactionCount: transactions.length
    };
  }, [transactions]);

  // Export transactions
  const exportTransactions = useCallback(() => {
    try {
      return transactionService.exportTransactions();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export transactions';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Import transactions
  const importTransactions = useCallback(async (jsonData: string) => {
    try {
      setError(null);
      const importedCount = transactionService.importTransactions(jsonData);
      // Reload transactions after import
      const updatedTransactions = transactionService.getTransactions();
      setTransactions(updatedTransactions);
      return importedCount;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to import transactions';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    clearAllTransactions,
    getSummary,
    exportTransactions,
    importTransactions
  };
}
