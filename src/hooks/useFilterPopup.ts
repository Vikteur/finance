import { useState } from 'react';

export function useFilterPopup() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(-1);

  return {
    isFilterOpen,
    setIsFilterOpen,
    showTitleDropdown,
    setShowTitleDropdown,
    selectedTitleIndex,
    setSelectedTitleIndex
  };
}
