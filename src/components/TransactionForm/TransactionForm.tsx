import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material';
import { 
  Euro as EuroIcon,
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon
} from '@mui/icons-material';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    title: string;
    category: string;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
  }) => void;
}

const categoryOptions = [
  { value: 'Groceries', label: '🛒 Groceries' },
  { value: 'Electricity', label: '💡 Electricity' },
  { value: 'Furniture', label: '🛋️ Furniture' },
  { value: 'Garden', label: '🌳 Garden' },
  { value: 'Clothes', label: '👕 Clothes' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Health', label: '🏥 Health' },
  { value: 'Dining', label: '🍽️ Dining' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Other', label: '📦 Other' },
];

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    amount: string;
    type: 'income' | 'expense';
    date: string;
  }>({
    title: '',
    category: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const [amountError, setAmountError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      // Allow numbers and comma, max two decimals after comma
      const formatted = value.replace(/[^0-9,]/g, '');
      const parts = formatted.split(',');
      let valid = parts[0];
      if (parts.length > 1) {
        valid += ',' + parts[1].slice(0, 2);
      }
      setFormData((prev) => ({ ...prev, [name]: valid }));
      setAmountError('');
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAmount = (amount: string): boolean => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(amount.replace(',', '.'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, category, amount, date, type } = formData;

    if (!validateAmount(amount)) {
      setAmountError('Amount must be a number with up to two decimals (e.g., 123.45 or 123,45)');
      return;
    }

    const parsedAmount = parseFloat(amount.replace(',', '.'));
    onAddTransaction({
      title,
      category,
      amount: parsedAmount,
      date: new Date(date),
      type,
    });

    // Reset form
    setFormData({
      title: '',
      category: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
    setAmountError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        variant="outlined"
        sx={{ mb: 1 }}
      />

      <FormControl fullWidth required sx={{ mb: 1 }}>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          label="Category"
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        variant="outlined"
        placeholder="e.g. 123,45"
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EuroIcon />
            </InputAdornment>
          ),
        }}
        error={!!amountError}
        helperText={amountError}
      />

      <FormControl fullWidth required sx={{ mb: 1 }}>
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleSelectChange}
          label="Type"
        >
          <MenuItem value="income">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IncomeIcon sx={{ color: 'success.main' }} />
              <Typography>Income</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="expense">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ExpenseIcon sx={{ color: 'error.main' }} />
              <Typography>Expense</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        variant="outlined"
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mt: 0.5,
          py: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: '1.1rem',
          fontWeight: 600,
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'translateY(-2px)',
          }
        }}
      >
        Add Transaction
      </Button>
    </Box>
  );
}

export default TransactionForm;