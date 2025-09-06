import { useState } from 'react';
import { TransactionFormData } from '../types/transaction';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<TransactionFormData, 'type'> & { amount: number, date: Date }) => void;
}

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    title: '',
    description: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      ...formData,
      amount: formData.type === 'expense' ? -Number(formData.amount) : Number(formData.amount),
      date: new Date(formData.date)
    });
    setFormData({
      title: '',
      description: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      aria-label="Add Transaction"
      style={{
        width: 300,
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 0,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        borderRadius: '1.25rem',
        boxShadow: '0 8px 32px rgba(59,130,246,0.10), 0 1.5px 6px rgba(0,0,0,0.08)',
        padding: '1.2rem 1.5rem',
        position: 'relative',
        top: 0,
        right: 0,
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}
    >
      <div className="form-group" style={{ marginBottom: '0.7rem' }}>
        <label className="form-label" htmlFor="title" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Title</label>
        <input
          className="form-input"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          autoComplete="off"
          style={{ height: '2.2rem', fontSize: '1rem', padding: '0.35rem 0.8rem 0.35rem 0.8rem', width: '100%', boxSizing: 'border-box', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#fff', boxShadow: '0 1px 4px rgba(59,130,246,0.04)', marginRight: 0 }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '0.7rem' }}>
        <label className="form-label" htmlFor="description" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Description</label>
        <textarea
          className="form-textarea"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={1}
          style={{ minHeight: '2.2rem', fontSize: '1rem', padding: '0.35rem 0.8rem 0.35rem 0.8rem', width: '100%', boxSizing: 'border-box', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#fff', boxShadow: '0 1px 4px rgba(59,130,246,0.04)', marginRight: 0 }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '0.7rem' }}>
        <label className="form-label" htmlFor="amount" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Amount</label>
        <input
          className="form-input"
          id="amount"
          type="number"
          name="amount"
          step="0.01"
          min="0.01"
          inputMode="decimal"
          value={formData.amount}
          onChange={handleChange}
          required
          style={{ height: '2.2rem', fontSize: '1rem', padding: '0.35rem 0.8rem 0.35rem 0.8rem', width: '100%', boxSizing: 'border-box', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#fff', boxShadow: '0 1px 4px rgba(59,130,246,0.04)', marginRight: 0 }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '0.7rem' }}>
        <label className="form-label" htmlFor="type" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Type</label>
        <select
          className="form-select"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={{ height: '2.2rem', fontSize: '1rem', padding: '0.35rem 0.8rem 0.35rem 0.8rem', width: '100%', boxSizing: 'border-box', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#fff', boxShadow: '0 1px 4px rgba(59,130,246,0.04)', marginRight: 0 }}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="form-group" style={{ marginBottom: '1.1rem' }}>
        <label className="form-label" htmlFor="date" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Date</label>
        <input
          className="form-input"
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ height: '2.2rem', fontSize: '1rem', padding: '0.35rem 0.8rem 0.35rem 0.8rem', width: '100%', boxSizing: 'border-box', borderRadius: '0.7rem', border: '1.5px solid #e5e7eb', background: '#fff', boxShadow: '0 1px 4px rgba(59,130,246,0.04)', marginRight: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
        <button
          className="btn btn-primary"
          type="submit"
          style={{ minWidth: 180, fontSize: '1.08rem', padding: '0.7rem 1.5rem', borderRadius: '0.8rem', background: 'linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 12px rgba(59,130,246,0.12)', border: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
