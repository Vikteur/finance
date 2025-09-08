import { Button } from '../../../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
      <div className="text-sm text-gray-600 font-medium">
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} transactions
      </div>

      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-3 h-3" />
          Previous
        </Button>

        <div className="flex items-center gap-1 text-sm text-gray-700 font-medium px-4 py-2">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
