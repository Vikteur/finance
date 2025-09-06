import { Transaction } from '../types/transaction';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-3 mb-6">
      <div className="card card-success">
        <h3 className="text-lg font-semibold mb-2">Total Income</h3>
        <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="card card-danger">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className={`card ${balance >= 0 ? 'card-success' : 'card-warning'}`}>
        <h3 className="text-lg font-semibold mb-2">Balance</h3>
        <p className="text-2xl font-bold">
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default TransactionSummary;
