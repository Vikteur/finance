import { useState } from 'react';
import { Transaction } from '../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
}

type SortConfig = {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
};

type Filters = {
  title: string;
  description: string;
  amount: {
    min: string;
    max: string;
  };
};

function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc'
  });

  const [filters, setFilters] = useState<Filters>({
    title: '',
    description: '',
    amount: {
      min: '',
      max: ''
    }
  });

  const filteredAndSortedTransactions = [...transactions]
    .filter(transaction => {
      const matchesTitle = transaction.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesDescription = transaction.description?.toLowerCase().includes(filters.description.toLowerCase()) ?? true;
      const matchesAmount = (
        (!filters.amount.min || transaction.amount >= Number(filters.amount.min)) &&
        (!filters.amount.max || transaction.amount <= Number(filters.amount.max))
      );
      return matchesTitle && matchesDescription && matchesAmount;
    })
    .sort((a, b) => {
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

  const requestSort = (key: keyof Transaction) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('date')}>
              <span>Date</span>
              {sortConfig.key === 'date' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => requestSort('title')}>
              <span>Title</span>
              {sortConfig.key === 'title' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => requestSort('description')}>
              <span>Description</span>
              {sortConfig.key === 'description' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
            <th onClick={() => requestSort('amount')}>
              <span>Amount</span>
              {sortConfig.key === 'amount' && (
                <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
          </tr>
          <tr className="filter-row">
            <th></th>
            <th>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Filter by title..."
                  value={filters.title}
                  onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                />
                {filters.title && (
                  <span 
                    className="clear-filter"
                    onClick={() => setFilters(prev => ({ ...prev, title: '' }))}
                  >
                    ×
                  </span>
                )}
              </div>
            </th>
            <th>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Filter by description..."
                  value={filters.description}
                  onChange={(e) => setFilters(prev => ({ ...prev, description: e.target.value }))}
                />
                {filters.description && (
                  <span 
                    className="clear-filter"
                    onClick={() => setFilters(prev => ({ ...prev, description: '' }))}
                  >
                    ×
                  </span>
                )}
              </div>
            </th>
            <th style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                className="filter-input"
                placeholder="Min"
                value={filters.amount.min}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  amount: { ...prev.amount, min: e.target.value }
                }))}
              />
              <input
                type="number"
                className="filter-input"
                placeholder="Max"
                value={filters.amount.max}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  amount: { ...prev.amount, max: e.target.value }
                }))}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTransactions.map((transaction: Transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td className="amount-cell">
                <span className={`amount ${transaction.amount < 0 ? 'expense' : 'income'}`}>
                  ${Math.abs(transaction.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
