import { Button } from '../../../ui/Button';
import { FileText, Filter, Plus } from 'lucide-react';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onOpenAddModal?: () => void;
  onClearFilters?: () => void;
}

export function EmptyState({ hasActiveFilters, onOpenAddModal, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-8">
      <div className="flex flex-col items-center gap-6 text-gray-500">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
              <Filter className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="text-center max-w-md">
          <div className="text-xl font-semibold mb-2 text-gray-700">
            {hasActiveFilters ? 'No matching transactions' : 'No transactions yet'}
          </div>
          <div className="text-sm opacity-80 leading-relaxed">
            {hasActiveFilters ? (
              <>
                Your filters didn&apos;t return any results. Try adjusting your search criteria or{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium underline underline-offset-2"
                  onClick={onClearFilters}
                >
                  clear all filters
                </Button>
                {' '}to see all transactions.
              </>
            ) : (
              <>
                Get started by adding your first transaction using the{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium underline underline-offset-2 inline-flex items-center gap-1"
                  onClick={onOpenAddModal}
                >
                  <Plus className="w-3 h-3" />
                  Add Transaction
                </Button>
                {' '}button.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
