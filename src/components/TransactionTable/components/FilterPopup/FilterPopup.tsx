import React from 'react';
import Select from 'react-select';
import { Filters, CategoryOption } from '../../types';
import { CATEGORY_OPTIONS } from '../../utils/constants';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import { Trash2, Check, FileText, Tag, DollarSign, X } from 'lucide-react';
import './FilterPopup.css';

interface FilterPopupProps {
  isOpen: boolean;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
  showTitleDropdown: boolean;
  selectedTitleIndex: number;
  onShowTitleDropdownChange: (show: boolean) => void;
  onSelectedTitleIndexChange: (index: number) => void;
  filteredTitles: string[];
  onClearFilters: () => void;
}

export function FilterPopup({
  isOpen,
  filters,
  onFiltersChange,
  onClose,
  showTitleDropdown,
  selectedTitleIndex,
  onShowTitleDropdownChange,
  onSelectedTitleIndexChange,
  filteredTitles,
  onClearFilters
}: FilterPopupProps) {
  if (!isOpen) return null;

  const handleTitleChange = (value: string) => {
    onFiltersChange({ ...filters, title: value });
    onShowTitleDropdownChange(true);
    onSelectedTitleIndexChange(-1);
  };

  const handleTitleSelect = (title: string) => {
    onFiltersChange({ ...filters, title });
    onShowTitleDropdownChange(false);
    onSelectedTitleIndexChange(-1);
  };

  const handleCategoryChange = (selected: CategoryOption | null) => {
    onFiltersChange({ ...filters, category: selected ? selected.value : '' });
  };

  const handleAmountChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      amount: { ...filters.amount, [field]: value }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showTitleDropdown || filteredTitles.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        onSelectedTitleIndexChange(
          selectedTitleIndex < filteredTitles.length - 1 ? selectedTitleIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        onSelectedTitleIndexChange(
          selectedTitleIndex > 0 ? selectedTitleIndex - 1 : filteredTitles.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedTitleIndex >= 0 && selectedTitleIndex < filteredTitles.length) {
          handleTitleSelect(filteredTitles[selectedTitleIndex]);
        }
        break;
      case 'Escape':
        onShowTitleDropdownChange(false);
        onSelectedTitleIndexChange(-1);
        break;
    }
  };

  return (
    <div className="filter-modal-overlay modal-position">
      <div className="filter-panel filter-panel-width panel-animation">
        <div className="panel-header">
          <h2 className="panel-title">Filter Transactions</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close filter panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="form-spacing">
          {/* Title Filter */}
          <div className="field-spacing">
            <Label className="field-label">
              <FileText className="w-4 h-4" />
              Title
            </Label>
            <div className="input-container">
              <Input
                type="text"
                placeholder="Search by transaction title..."
                value={filters.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
                onFocus={() => onShowTitleDropdownChange(true)}
                onBlur={() => {
                  setTimeout(() => {
                    onShowTitleDropdownChange(false);
                    onSelectedTitleIndexChange(-1);
                  }, 200);
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="filter-input"
              />
              {filters.title && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="clear-button"
                  onClick={() => handleTitleChange('')}
                  aria-label="Clear title filter"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}

              {/* Autocomplete Dropdown */}
              {showTitleDropdown && filters.title.length >= 2 && filteredTitles.length > 0 && (
                <div className="dropdown-menu">
                  {filteredTitles.map((title, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selectedTitleIndex === index ? 'dropdown-item-selected' : 'dropdown-item-default'
                      }`}
                      onClick={() => handleTitleSelect(title)}
                    >
                      {title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="field-spacing">
            <Label className="field-label">
              <Tag className="w-4 h-4" />
              Category
            </Label>
            <div className="filter-select">
              <Select
                options={CATEGORY_OPTIONS}
                value={filters.category ? CATEGORY_OPTIONS.find((opt) => opt.value === filters.category) || null : null}
                onChange={handleCategoryChange}
                placeholder="Select a category..."
                isClearable
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: '44px',
                    borderRadius: '0.5rem',
                    borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#9ca3af',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    fontSize: '0.875rem',
                    color: state.isSelected ? '#1d4ed8' : '#374151',
                    backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f3f4f6' : 'white',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: '0.875rem',
                    color: '#374151',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    zIndex: 1000,
                    border: '1px solid #e5e7eb',
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    cursor: 'pointer',
                    color: '#9ca3af',
                    '&:hover': {
                      color: '#374151',
                    },
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: '#9ca3af',
                    '&:hover': {
                      color: '#374151',
                    },
                  }),
                }}
              />
            </div>
          </div>

          {/* Amount Range Filter */}
          <div className="field-spacing">
            <Label className="field-label">
              <DollarSign className="w-4 h-4" />
              Amount Range
            </Label>
            <div className="amount-inputs">
              <div className="input-field">
                <Input
                  type="number"
                  placeholder="Min amount"
                  value={filters.amount.min}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmountChange('min', e.target.value)}
                  className="filter-input"
                  step="1"
                />
              </div>
              <div className="amount-separator">
                to
              </div>
              <div className="input-field">
                <Input
                  type="number"
                  placeholder="Max amount"
                  value={filters.amount.max}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmountChange('max', e.target.value)}
                  className="filter-input"
                  step="1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="action-button"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button
              onClick={onClose}
              className="action-button"
            >
              <Check className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}