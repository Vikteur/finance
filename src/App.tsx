import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import TransactionSummary from './components/TransactionSummary';
import SearchBar from './components/SearchBar';
import { Transaction } from './types/transaction';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Finance Tracker</h1>
          <div className="search-container">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </header>
      <div className="container">
        <TransactionSummary transactions={filteredTransactions} />
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '2rem' }}>
          <div style={{ flex: 1 }}>
            <TransactionTable transactions={filteredTransactions} />
          </div>
          <div style={{ flexShrink: 0 }}>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        </div>
      </div>
    </>
  );
}
