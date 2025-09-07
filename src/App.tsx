import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionSummary from './components/TransactionSummary/TransactionSummary';
import SearchBar from './components/SearchBar/SearchBar';
import { Transaction } from './types/transaction';
import { useTransactions } from './hooks/useTransactions';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    transactions,
    addTransaction
  } = useTransactions();

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await addTransaction(transaction);
      setIsModalOpen(false); // Close modal after adding transaction
    } catch (error) {
      console.error('Failed to add transaction:', error);
      alert('Failed to save transaction. Please try again.');
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Finance Tracker</h1>
          
          <div className="header-center">
            <div className="search-container">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>

          <div className="header-right">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-6 py-3 text-base font-semibold rounded-full bg-white/20 backdrop-blur-md text-white border-2 border-white/30 cursor-pointer shadow-lg transition-all duration-300 whitespace-nowrap hover:bg-white/30 hover:border-white/50 hover:-translate-y-1 hover:shadow-2xl"
            >
              {isLoggedIn ? '🚪 Logout' : '🔐 Login'}
            </button>
          </div>
        </div>
      </header>
      <div className="container fade-in-container">
        <div className="mb-8 fade-in-summary">
          <TransactionSummary transactions={filteredTransactions} />
        </div>

        <div className="responsive-layout fade-in-table flex gap-8 items-start">
          <div className="table-container">
            <TransactionTable 
              transactions={filteredTransactions} 
              onOpenAddModal={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fab-button fade-in-fab"
          title="Add Transaction"
        >
          +
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Transaction</h2>
                <button
                  className="modal-close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <TransactionForm onAddTransaction={handleAddTransaction} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
