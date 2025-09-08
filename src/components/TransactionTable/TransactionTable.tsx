import { Transaction } from '../../types/transaction';
import { useTransactionSorting } from '../../hooks/useTransactionSorting';
import { useTransactionFilters } from '../../hooks/useTransactionFilters';
import { usePagination } from '../../hooks/usePagination';
import { useFilterPopup } from '../../hooks/useFilterPopup';
import { FilterButton } from './components/FilterButton/FilterButton';
import { TableHeader } from './components/TableHeader/TableHeader';
import { TableRow } from './components/TableRow/TableRow';
import { EmptyState } from './components/EmptyState/EmptyState';
import { PaginationControls } from './components/PaginationControls/PaginationControls';
import { FilterPopup } from './components/FilterPopup/FilterPopup';
import './TransactionTable.css';

interface TransactionTableProps {
  transactions: Transaction[];
  onOpenAddModal?: () => void;
}

export function TransactionTable({ transactions, onOpenAddModal }: TransactionTableProps) {
  // Ensure transactions is an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Custom hooks for state management
  const { sortConfig, requestSort, sortedTransactions } = useTransactionSorting(safeTransactions);
  const { filters, setFilters, clearFilters, filteredTransactions } = useTransactionFilters(sortedTransactions);
  const { currentPage, setCurrentPage, paginatedItems, totalPages, startIndex, endIndex } = usePagination(filteredTransactions, 10);
  const { isFilterOpen, setIsFilterOpen, showTitleDropdown, setShowTitleDropdown, selectedTitleIndex, setSelectedTitleIndex } = useFilterPopup();

  // Get unique transaction titles for autocomplete
  const uniqueTitles = [...new Set(safeTransactions.map(t => t.title).filter(title => title && title.trim()))];
  const filteredTitles = uniqueTitles.filter(title =>
    title.toLowerCase().includes(filters.title.toLowerCase())
  ).slice(0, 10);

  const hasActiveFilters = !!(filters.title || filters.category || filters.amount.min || filters.amount.max);

  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (key: keyof Transaction) => {
    requestSort(key);
    setCurrentPage(1);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <TableHeader
            sortConfig={sortConfig}
            onSort={handleSortChange}
            filterButton={
              <FilterButton
                isActive={hasActiveFilters}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              />
            }
          />
        </thead>
        <tbody>
          {paginatedItems.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <EmptyState
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  onOpenAddModal={onOpenAddModal}
                />
              </td>
            </tr>
          ) : (
            paginatedItems.map((transaction: Transaction) => (
              <TableRow key={transaction.id} transaction={transaction} />
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Filter Popup */}
      <FilterPopup
        isOpen={isFilterOpen}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClose={() => setIsFilterOpen(false)}
        showTitleDropdown={showTitleDropdown}
        selectedTitleIndex={selectedTitleIndex}
        onShowTitleDropdownChange={setShowTitleDropdown}
        onSelectedTitleIndexChange={setSelectedTitleIndex}
        filteredTitles={filteredTitles}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}

export default TransactionTable;
