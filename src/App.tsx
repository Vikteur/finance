import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Container, Box, Typography, AppBar, Toolbar, Button, Fab, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionSummary from './components/TransactionSummary/TransactionSummary';
import SearchBar from './components/SearchBar/SearchBar';
import { Transaction } from './types/transaction';
import { useTransactions } from './hooks/useTransactions';
import theme from './theme';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Finance Tracker
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar onSearch={setSearchQuery} />
          </Box>

          <Button
            variant="contained"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <TransactionSummary transactions={filteredTransactions} />
        </Box>

        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            <TransactionTable 
              transactions={filteredTransactions} 
              onOpenAddModal={() => setIsModalOpen(true)}
            />
          </Box>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={() => setIsModalOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'scale(1.1)',
            }
          }}
        >
          <AddIcon />
        </Fab>

        {/* Modal */}
        <Dialog 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            Add New Transaction
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
