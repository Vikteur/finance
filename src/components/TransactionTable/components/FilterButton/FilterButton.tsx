import { Button } from '../../../ui/Button';
import { Filter } from 'lucide-react';

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export function FilterButton({ isActive, onClick }: FilterButtonProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={`transition-all duration-300 hover:scale-105 ${
          isActive
            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-md'
            : 'hover:bg-gray-50'
        }`}
        title={isActive ? "Filters active - Click to modify" : "Filter transactions"}
        aria-label={isActive ? "Modify active filters" : "Open filter panel"}
      >
        <Filter
          className={`w-4 h-4 transition-all duration-300 ${
            isActive ? 'text-blue-600' : 'text-gray-600'
          }`}
        />
      </Button>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      )}
    </div>
  );
}