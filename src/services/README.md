# Transaction Service

A comprehensive service for managing financial transactions with localStorage persistence in the browser.

## Features

- ✅ **Persistent Storage**: All transactions are automatically saved to browser's localStorage
- ✅ **CRUD Operations**: Create, Read, Update, Delete transactions
- ✅ **Data Validation**: Proper error handling and data validation
- ✅ **Type Safety**: Full TypeScript support with proper typing
- ✅ **Singleton Pattern**: Efficient memory usage with singleton instance
- ✅ **Advanced Queries**: Filter by type, date range, and search
- ✅ **Import/Export**: JSON import and export functionality
- ✅ **Storage Analytics**: Monitor localStorage usage

## Usage

### Basic Usage

```typescript
import { transactionService } from './services/transactionService';

// Add a new transaction
const newTransaction = transactionService.addTransaction({
  title: 'Grocery Shopping',
  category: 'Groceries',
  amount: 45.50,
  date: new Date(),
  type: 'expense'
});

// Get all transactions
const transactions = transactionService.getTransactions();

// Update a transaction
transactionService.updateTransaction(transactionId, {
  title: 'Updated Title'
});

// Delete a transaction
transactionService.deleteTransaction(transactionId);
```

### Using the React Hook

```typescript
import { useTransactions } from './hooks/useTransactions';

function MyComponent() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
  } = useTransactions();

  const handleAddTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      console.log('Transaction added successfully!');
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const summary = getSummary();
  // { income: 1500, expenses: 800, balance: 700, transactionCount: 15 }

  return (
    <div>
      <h2>Balance: €{summary.balance}</h2>
      {/* Your component JSX */}
    </div>
  );
}
```

## API Reference

### TransactionService Methods

#### Core CRUD Operations
- `addTransaction(transaction)` - Add a new transaction
- `updateTransaction(id, updates)` - Update an existing transaction
- `deleteTransaction(id)` - Delete a transaction by ID
- `getTransactionById(id)` - Get a single transaction by ID

#### Query Methods
- `getTransactions()` - Get all transactions
- `getTransactionsByType(type)` - Get transactions by type ('income' | 'expense')
- `getTransactionsByDateRange(startDate, endDate)` - Get transactions within date range

#### Analytics Methods
- `getTotalByType(type)` - Get total amount for a type
- `getBalance()` - Get current balance (income - expenses)
- `getStorageInfo()` - Get localStorage usage information

#### Import/Export
- `exportTransactions()` - Export all transactions as JSON string
- `importTransactions(jsonData)` - Import transactions from JSON string
- `clearAllTransactions()` - Remove all transactions

## Data Structure

```typescript
type Transaction = {
  id: number;           // Auto-generated unique identifier
  title: string;        // Transaction description
  category?: string;    // Optional category
  amount: number;       // Transaction amount
  date: Date;          // Transaction date
  type: 'income' | 'expense';  // Transaction type
};
```

## Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const transaction = transactionService.addTransaction(transactionData);
} catch (error) {
  console.error('Failed to add transaction:', error.message);
  // Handle error appropriately
}
```

## Storage Details

- **Storage Key**: `finance_transactions`
- **Format**: JSON with automatic Date serialization/deserialization
- **Persistence**: Survives browser refreshes and sessions
- **Capacity**: Uses browser's localStorage (typically 5-10MB)

## Browser Compatibility

- ✅ Chrome 4+
- ✅ Firefox 3.5+
- ✅ Safari 4+
- ✅ Edge 12+
- ✅ All modern browsers

## Best Practices

1. **Always handle errors** when calling service methods
2. **Use the React hook** (`useTransactions`) for React components
3. **Validate data** before passing to service methods
4. **Consider storage limits** for large datasets
5. **Backup data** before clearing all transactions

## Examples

### Adding Multiple Transactions
```typescript
const transactions = [
  { title: 'Salary', amount: 3000, type: 'income', date: new Date(), category: 'Work' },
  { title: 'Rent', amount: 800, type: 'expense', date: new Date(), category: 'Housing' },
  { title: 'Groceries', amount: 150, type: 'expense', date: new Date(), category: 'Food' }
];

transactions.forEach(tx => transactionService.addTransaction(tx));
```

### Filtering and Analysis
```typescript
// Get this month's expenses
const thisMonth = new Date();
thisMonth.setDate(1);
const nextMonth = new Date(thisMonth);
nextMonth.setMonth(nextMonth.getMonth() + 1);

const monthlyExpenses = transactionService.getTransactionsByDateRange(thisMonth, nextMonth)
  .filter(tx => tx.type === 'expense');

const totalMonthlyExpenses = monthlyExpenses.reduce((sum, tx) => sum + tx.amount, 0);
```

### Export/Import for Backup
```typescript
// Export data
const backupData = transactionService.exportTransactions();
localStorage.setItem('backup_' + Date.now(), backupData);

// Import data
const backupData = localStorage.getItem('backup_1234567890');
if (backupData) {
  const importedCount = transactionService.importTransactions(backupData);
  console.log(`Imported ${importedCount} transactions`);
}
```
