import { Transaction } from '../types/transaction';

const STORAGE_KEY = 'finance_transactions';

// Type for raw transaction data from localStorage (dates as strings)
interface RawTransaction {
  id: number;
  title: string;
  category?: string;
  amount: number;
  date: string; // Date stored as string in localStorage
  type: 'income' | 'expense';
}

// Type for imported transaction data (could have various formats)
interface ImportedTransaction {
  id?: number;
  title?: string;
  category?: string;
  amount?: number;
  date?: string | Date;
  type?: string;
}

class TransactionService {
  private static instance: TransactionService;

  private constructor() {}

  static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  /**
   * Get all transactions from localStorage
   */
  getTransactions(): Transaction[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((transaction: RawTransaction) => ({
        ...transaction,
        date: new Date(transaction.date)
      }));
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
      return [];
    }
  }

  /**
   * Save a transaction to localStorage
   */
  addTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
    try {
      const transactions = this.getTransactions();
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now() // Generate unique ID
      };

      transactions.push(newTransaction);
      this.saveTransactionsToStorage(transactions);

      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw new Error('Failed to add transaction');
    }
  }

  /**
   * Update an existing transaction
   */
  updateTransaction(id: number, updates: Partial<Omit<Transaction, 'id'>>): Transaction | null {
    try {
      const transactions = this.getTransactions();
      const index = transactions.findIndex(t => t.id === id);

      if (index === -1) {
        return null;
      }

      transactions[index] = { ...transactions[index], ...updates };
      this.saveTransactionsToStorage(transactions);

      return transactions[index];
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction');
    }
  }

  /**
   * Delete a transaction by ID
   */
  deleteTransaction(id: number): boolean {
    try {
      const transactions = this.getTransactions();
      const filteredTransactions = transactions.filter(t => t.id !== id);

      if (filteredTransactions.length === transactions.length) {
        return false; // Transaction not found
      }

      this.saveTransactionsToStorage(filteredTransactions);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('Failed to delete transaction');
    }
  }

  /**
   * Get a transaction by ID
   */
  getTransactionById(id: number): Transaction | null {
    try {
      const transactions = this.getTransactions();
      return transactions.find(t => t.id === id) || null;
    } catch (error) {
      console.error('Error getting transaction by ID:', error);
      return null;
    }
  }

  /**
   * Clear all transactions
   */
  clearAllTransactions(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing transactions:', error);
      throw new Error('Failed to clear transactions');
    }
  }

  /**
   * Get transactions filtered by type
   */
  getTransactionsByType(type: 'income' | 'expense'): Transaction[] {
    try {
      const transactions = this.getTransactions();
      return transactions.filter(t => t.type === type);
    } catch (error) {
      console.error('Error filtering transactions by type:', error);
      return [];
    }
  }

  /**
   * Get transactions within a date range
   */
  getTransactionsByDateRange(startDate: Date, endDate: Date): Transaction[] {
    try {
      const transactions = this.getTransactions();
      return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    } catch (error) {
      console.error('Error filtering transactions by date range:', error);
      return [];
    }
  }

  /**
   * Get total amount for a specific type
   */
  getTotalByType(type: 'income' | 'expense'): number {
    try {
      const transactions = this.getTransactionsByType(type);
      return transactions.reduce((total, t) => total + t.amount, 0);
    } catch (error) {
      console.error('Error calculating total by type:', error);
      return 0;
    }
  }

  /**
   * Get balance (income - expenses)
   */
  getBalance(): number {
    try {
      const income = this.getTotalByType('income');
      const expenses = this.getTotalByType('expense');
      return income - expenses;
    } catch (error) {
      console.error('Error calculating balance:', error);
      return 0;
    }
  }

  /**
   * Export transactions as JSON
   */
  exportTransactions(): string {
    try {
      const transactions = this.getTransactions();
      return JSON.stringify(transactions, null, 2);
    } catch (error) {
      console.error('Error exporting transactions:', error);
      throw new Error('Failed to export transactions');
    }
  }

  /**
   * Import transactions from JSON
   */
  importTransactions(jsonData: string): number {
    try {
      const importedTransactions = JSON.parse(jsonData);

      if (!Array.isArray(importedTransactions)) {
        throw new Error('Invalid JSON format');
      }

      // Validate and convert imported transactions
      const validTransactions: Transaction[] = importedTransactions
        .filter((item: ImportedTransaction): item is Required<Pick<ImportedTransaction, 'id' | 'title' | 'amount' | 'date' | 'type'>> & Partial<Pick<ImportedTransaction, 'category'>> => {
          return !!(item.id && item.title && typeof item.amount === 'number' && item.date && item.type);
        })
        .map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          amount: item.amount,
          date: new Date(item.date),
          type: item.type as 'income' | 'expense'
        }));

      const existingTransactions = this.getTransactions();
      const mergedTransactions = [...existingTransactions, ...validTransactions];

      this.saveTransactionsToStorage(mergedTransactions);

      return validTransactions.length;
    } catch (error) {
      console.error('Error importing transactions:', error);
      throw new Error('Failed to import transactions');
    }
  }

  /**
   * Private method to save transactions to localStorage
   */
  private saveTransactionsToStorage(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save transactions to localStorage');
    }
  }

  /**
   * Get storage usage information
   */
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const transactions = localStorage.getItem(STORAGE_KEY);
      const used = transactions ? transactions.length : 0;

      // Estimate available space (localStorage typically has 5-10MB limit)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const available = Math.max(0, estimatedLimit - used);
      const percentage = (used / estimatedLimit) * 100;

      return { used, available, percentage };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }
}

// Export singleton instance
export const transactionService = TransactionService.getInstance();

// Export class for testing purposes
export { TransactionService };
