import { useState, useEffect } from 'react';

export function useFilterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(-1);

  // Handle escape key to close filter popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const resetDropdownState = () => {
    setShowTitleDropdown(false);
    setSelectedTitleIndex(-1);
  };

  return {
    isOpen,
    showTitleDropdown,
    selectedTitleIndex,
    setShowTitleDropdown,
    setSelectedTitleIndex,
    openPopup,
    closePopup,
    resetDropdownState
  };
}
