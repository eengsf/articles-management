'use client';

import React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationArticlesProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const PaginationArticles: React.FC<PaginationArticlesProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getDisplayedPages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 'ellipsis');
      } else if (currentPage >= totalPages - 1) {
        pages.push('ellipsis', totalPages - 1, totalPages);
      } else {
        pages.push(currentPage, currentPage + 1, 'ellipsis');
      }
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center mt-8">
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }} />
          </PaginationItem>

          {displayedPages.map((page, index) => (
            page === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof page === 'number') {
                      goToPage(page);
                    }
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          ))}

          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => {
              e.preventDefault();
              handleNext();
            }} />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
};

export default PaginationArticles;
