import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    title: string;
    category: string;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
  }) => void;
}

const inputStyle = {
  height: '2rem',
  fontSize: '1rem',
  padding: '0.25rem 0.8rem',
  width: '100%',
  boxSizing: 'border-box' as const,
};

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

type CategoryOption = { value: string; label: string };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      // Only allow numbers and comma, max two decimals after comma
      const formatted = value.replace(/[^0-9,]/g, '');
      // Only one comma
      const parts = formatted.split(',');
      let valid = parts[0];
      if (parts.length > 1) {
        valid += ',' + parts[1].slice(0, 2);
      }
      setFormData((prev) => ({ ...prev, [name]: valid }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (selected: CategoryOption | null) => {
    setFormData((prev) => ({ ...prev, category: selected ? selected.value : '' }));
  };

  const handleTypeChange = (selected: { value: 'income' | 'expense'; label: string } | null) => {
    setFormData((prev) => ({ ...prev, type: selected ? selected.value : prev.type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, category, amount, date, type } = formData;
    // Validate: must be number, optional dot, max two decimals
    if (!/^\d+(\.\d{1,2})?$/.test(amount.replace(',', '.'))) {
      alert('Amount must be a number with up to two decimals, separated by a dot.');
      return;
    }
    // Convert to float (replace comma with dot)
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    onAddTransaction({
      title,
      category,
      amount: parsedAmount,
      date: new Date(date),
      type,
    });
    setFormData({
      title: '',
      category: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.2rem',
        borderRadius: '1.1rem',
        background: '#f7fafd',
        boxShadow: '0 2px 12px rgba(59,130,246,0.07)',
        minWidth: 320,
        maxWidth: 370,
      }}
    >
      <div className="form-group" style={{ marginBottom: 0 }}>
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
          style={inputStyle}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="category" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Category</label>
        <Select
          id="category"
          name="category"
          options={categoryOptions}
          value={categoryOptions.find((opt) => opt.value === formData.category) || null}
          onChange={handleCategoryChange}
          placeholder="Select category"
          isClearable
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '48px',
              borderRadius: '0.5rem',
              borderColor: '#e5e7eb',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              fontSize: '1rem',
              color: 'var(--text-dark)',
              backgroundColor: 'white',
              paddingLeft: '0.5rem',
            }),
            option: (provided, state) => ({
              ...provided,
              fontSize: '1rem',
              color: state.isSelected ? '#2563eb' : '#374151',
              backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: '1rem',
              color: '#374151',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: '#6b7280',
              fontSize: '1rem',
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.5rem',
              boxShadow: '0 4px 16px rgba(59,130,246,0.10)',
              backgroundColor: 'white',
              zIndex: 20,
            }),
          }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0, position: 'relative' }}>
        <label className="form-label" htmlFor="amount" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Amount</label>
        <span style={{
          position: 'absolute',
          left: 12,
          top: 32,
          fontSize: '1.1rem',
          color: '#374151',
          zIndex: 2,
        }}>€</span>
        <input
          className="form-input"
          id="amount"
          type="text"
          name="amount"
          inputMode="decimal"
          value={formData.amount}
          onChange={handleChange}
          required
          style={{ ...inputStyle, paddingLeft: '2rem' }}
          placeholder="e.g. 123,45"
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="type" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Type</label>
        <Select
          id="type"
          name="type"
          options={[
            { value: 'income', label: '💰 Income' },
            { value: 'expense', label: '💸 Expense' },
          ]}
          value={formData.type ? { value: formData.type, label: formData.type === 'income' ? '💰 Income' : '💸 Expense' } : null}
          onChange={handleTypeChange}
          placeholder="Select type"
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '48px',
              borderRadius: '0.5rem',
              borderColor: '#e5e7eb',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              fontSize: '1rem',
              color: 'var(--text-dark)',
              backgroundColor: 'white',
              paddingLeft: '0.5rem',
            }),
            option: (provided, state) => ({
              ...provided,
              fontSize: '1rem',
              color: state.isSelected ? '#2563eb' : '#374151',
              backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: '1rem',
              color: '#374151',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: '#6b7280',
              fontSize: '1rem',
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.5rem',
              boxShadow: '0 4px 16px rgba(59,130,246,0.10)',
              backgroundColor: 'white',
              zIndex: 20,
            }),
          }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="date" style={{ marginBottom: '0.25rem', fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>Date</label>
        <input
          className="form-input"
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
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