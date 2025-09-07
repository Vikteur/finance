import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

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

const typeOptions = [
  { value: 'income' as const, label: '💰 Income' },
  { value: 'expense' as const, label: '💸 Expense' },
];

type CategoryOption = { value: string; label: string };
type TypeOption = { value: 'income' | 'expense'; label: string };

const categorySelectStyles: StylesConfig<CategoryOption, false> = {
  control: (provided) => ({
    ...provided,
    minHeight: '48px',
    borderRadius: '0.5rem',
    borderColor: '#e5e7eb',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    fontSize: '1rem',
    color: '#374151',
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
};

const typeSelectStyles: StylesConfig<TypeOption, false> = {
  control: (provided) => ({
    ...provided,
    minHeight: '48px',
    borderRadius: '0.5rem',
    borderColor: '#e5e7eb',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    fontSize: '1rem',
    color: '#374151',
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
};

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

  const handleCategoryChange = (selected: CategoryOption | null) => {
    setFormData((prev) => ({ ...prev, category: selected ? selected.value : '' }));
  };

  const handleTypeChange = (selected: TypeOption | null) => {
    setFormData((prev) => ({ ...prev, type: selected ? selected.value : prev.type }));
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <div className="mb-0">
        <label
          htmlFor="title"
          className="block mb-1 font-semibold text-gray-700 text-lg"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          autoComplete="off"
          className="h-8 text-base px-3 py-1 w-full box-border rounded-md border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mb-0">
        <label
          htmlFor="category"
          className="block mb-1 font-semibold text-gray-700 text-lg"
        >
          Category
        </label>
        <Select
          id="category"
          name="category"
          options={categoryOptions}
          value={categoryOptions.find((opt) => opt.value === formData.category) || null}
          onChange={handleCategoryChange}
          placeholder="Select category"
          isClearable
          styles={categorySelectStyles}
        />
      </div>

      <div className="mb-0 relative">
        <label
          htmlFor="amount"
          className="block mb-1 font-semibold text-gray-700 text-lg"
        >
          Amount
        </label>
        <span className="absolute left-3 top-8 text-lg text-gray-700 z-10">€</span>
        <input
          id="amount"
          type="text"
          name="amount"
          inputMode="decimal"
          value={formData.amount}
          onChange={handleChange}
          required
          className="h-8 text-base pl-8 pr-3 py-1 w-full box-border rounded-md border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="e.g. 123,45"
        />
        {amountError && (
          <p className="text-red-500 text-sm mt-1">{amountError}</p>
        )}
      </div>

      <div className="mb-0">
        <label
          htmlFor="type"
          className="block mb-1 font-semibold text-gray-700 text-lg"
        >
          Type
        </label>
        <Select
          id="type"
          name="type"
          options={typeOptions}
          value={typeOptions.find((opt) => opt.value === formData.type) || null}
          onChange={handleTypeChange}
          placeholder="Select type"
          styles={typeSelectStyles}
        />
      </div>

      <div className="mb-0">
        <label
          htmlFor="date"
          className="block mb-1 font-semibold text-gray-700 text-lg"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="h-8 text-base px-3 py-1 w-full box-border rounded-md border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex justify-center mt-2">
        <button
          type="submit"
          className="w-full text-lg py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg border-none tracking-wide transition-all duration-200 hover:shadow-xl hover:from-blue-600 hover:to-blue-700"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;