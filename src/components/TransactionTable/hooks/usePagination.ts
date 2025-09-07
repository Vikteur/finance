import { useState, useEffect, useMemo } from 'react';
import { PaginationState } from '../types';
import { ITEMS_PER_PAGE } from '../utils/constants';

export function usePagination(totalItems: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationState: PaginationState = useMemo(() => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    return {
      currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems,
      totalPages
    };
  }, [currentPage, totalItems]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return { startIndex, endIndex };
  }, [currentPage]);

  // Reset to first page when total items change
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationState.totalPages)));
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, paginationState.totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return {
    paginationState,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage
  };
}
