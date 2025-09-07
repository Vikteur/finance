import { Transaction } from '../../types';

interface TableRowProps {
  transaction: Transaction;
}

export function TableRow({ transaction }: TableRowProps) {
  return (
    <tr>
      <td>
        {transaction.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </td>
      <td>{transaction.title}</td>
      <td>{transaction.category}</td>
      <td className="amount-cell">
        <span className={`amount ${transaction.type === 'expense' ? 'expense' : 'income'}`}>
          €{Math.abs(transaction.amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      </td>
      <td></td>
    </tr>
  );
}
