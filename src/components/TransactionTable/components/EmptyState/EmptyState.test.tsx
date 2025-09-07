import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { Button } from '../../../ui/Button';

describe('EmptyState', () => {
  const mockOnClearFilters = jest.fn();
  const mockOnOpenAddModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no transactions message when no filters are active', () => {
    render(
      <EmptyState
        hasActiveFilters={false}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
    expect(screen.getByText(/Get started by adding your first transaction/)).toBeInTheDocument();
  });

  it('renders no matching transactions message when filters are active', () => {
    render(
      <EmptyState
        hasActiveFilters={true}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    expect(screen.getByText('No matching transactions')).toBeInTheDocument();
    expect(screen.getByText(/Your filters didn&apos;t return any results/)).toBeInTheDocument();
  });

  it('shows filter indicator when filters are active', () => {
    render(
      <EmptyState
        hasActiveFilters={true}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    // The filter indicator should be present
    const filterIcon = screen.getByTestId('filter-icon') || document.querySelector('.empty-state-filter-badge');
    expect(filterIcon).toBeInTheDocument();
  });

  it('calls onClearFilters when clear filters button is clicked', () => {
    render(
      <EmptyState
        hasActiveFilters={true}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    const clearButton = screen.getByText('clear all filters');
    clearButton.click();

    expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenAddModal when add transaction button is clicked', () => {
    render(
      <EmptyState
        hasActiveFilters={false}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    const addButton = screen.getByText('Add Transaction');
    addButton.click();

    expect(mockOnOpenAddModal).toHaveBeenCalledTimes(1);
  });

  it('does not render clear filters button when no filters are active', () => {
    render(
      <EmptyState
        hasActiveFilters={false}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    expect(screen.queryByText('clear all filters')).not.toBeInTheDocument();
  });

  it('renders file text icon', () => {
    render(
      <EmptyState
        hasActiveFilters={false}
        onClearFilters={mockOnClearFilters}
        onOpenAddModal={mockOnOpenAddModal}
      />
    );

    const icon = document.querySelector('.empty-state-icon-main') || screen.getByTestId('file-icon');
    expect(icon).toBeInTheDocument();
  });
});
