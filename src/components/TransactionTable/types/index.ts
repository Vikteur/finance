import { Transaction } from '../../../types/transaction';

// TransactionTable types
export interface TransactionTableProps {
  transactions: Transaction[];
  onOpenAddModal?: () => void;
}

export interface SortConfig {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}

export interface Filters {
  title: string;
  category: string;
  amount: {
    min: string;
    max: string;
  };
}

export interface CategoryOption {
  value: string;
  label: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FilterPopupState {
  isOpen: boolean;
  showTitleDropdown: boolean;
  selectedTitleIndex: number;
}

// Re-export Transaction type for convenience
export type { Transaction };
