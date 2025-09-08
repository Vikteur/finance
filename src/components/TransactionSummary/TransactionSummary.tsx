import { Transaction } from '../../types/transaction';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
      <Card 
        sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUp sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Total Income
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={700}>
            €{totalIncome.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      
      <Card 
        sx={{ 
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingDown sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Total Expenses
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={700}>
            €{totalExpenses.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      
      <Card 
        sx={{ 
          background: balance >= 0 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccountBalance sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Balance
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={700}>
            €{balance.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TransactionSummary;
