import { Transaction } from '../../types/transaction';
import './TransactionSummary.css';

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
    <div className="grid grid-cols-3 gap-4">
      <div className="card card-success fade-in-card-1">
        <h3 className="text-lg font-semibold mb-2">Total Income</h3>
        <p className="text-2xl font-bold">€{totalIncome.toFixed(2)}</p>
      </div>
      <div className="card card-danger fade-in-card-2">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold">€{totalExpenses.toFixed(2)}</p>
      </div>
      <div className={`card ${balance >= 0 ? 'card-success' : 'card-warning'} fade-in-card-3`}>
        <h3 className="text-lg font-semibold mb-2">Balance</h3>
        <p className="text-2xl font-bold">
          €{balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default TransactionSummary;
