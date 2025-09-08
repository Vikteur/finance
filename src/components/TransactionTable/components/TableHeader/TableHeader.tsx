import React from 'react';
import { Transaction } from '../../../../types/transaction';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Define SortConfig interface inline
interface SortConfig {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}

interface TableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: keyof Transaction) => void;
  filterButton: React.ReactNode;
}

export function TableHeader({ sortConfig, onSort, filterButton }: TableHeaderProps) {
  const renderSortIndicator = (key: keyof Transaction) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ?
      <ArrowUp className="w-3 h-3 inline ml-1" /> :
      <ArrowDown className="w-3 h-3 inline ml-1" />;
  };

  return (
    <tr>
      <th onClick={() => onSort('date')} className="cursor-pointer hover:bg-gray-50 transition-colors">
        <span>Date</span>
        {renderSortIndicator('date')}
      </th>
      <th onClick={() => onSort('title')} className="cursor-pointer hover:bg-gray-50 transition-colors">
        <span>Title</span>
        {renderSortIndicator('title')}
      </th>
      <th onClick={() => onSort('category')} className="cursor-pointer hover:bg-gray-50 transition-colors">
        <span>Category</span>
        {renderSortIndicator('category')}
      </th>
      <th onClick={() => onSort('amount')} className="cursor-pointer hover:bg-gray-50 transition-colors">
        <span>Amount</span>
        {renderSortIndicator('amount')}
      </th>
      <th className="filter-header">
        {filterButton}
      </th>
    </tr>
  );
}
