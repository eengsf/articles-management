
'use client';

import React, { useState } from 'react';
import { Category } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationArticles from './PaginationArticles';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EditCategoryForm from './EditCategoryForm';

interface ContentProps {
  paginatedCategory: Category[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  setHandleEditClick: (category: Category) => void;
  setHandleDeleteClick: (category: string) => void;
}

function CategoriesTable({
  paginatedCategory,
  currentPage,
  totalPages,
  goToPage,
  // setHandleEditClick,
  setHandleDeleteClick,
}: ContentProps) {
  const [open, setOpen] = useState(false);
  function formatDateToReadable(dateString: string): string {
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="w-full">
      {paginatedCategory.length === 0 ? (
        <div className="text-center text-gray-500">No articles found.</div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <Table className="w-full  box-border">
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="w-1/3 text-center">Category</TableHead>
                  <TableHead className="w-1/3 text-center">
                    Created At
                  </TableHead>
                  <TableHead className="w-1/3 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategory.map((category) => (
                  <TableRow key={category.id} className="min-h-16">
                    <TableCell className=" w-1/3 text-slate-600 text-center py-7">
                      {category.name}
                    </TableCell>

                    <TableCell className="w-1/3 text-slate-600 text-center py-7">
                      {formatDateToReadable(category.createdAt)}
                    </TableCell>
                    <TableCell className="w-1/3 text-center space-x-2 py-7">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setOpen(true)}
                            className="text-blue-500 underline"
                          >
                            Edit
                          </button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                          </DialogHeader>
                          <EditCategoryForm
                            onCancel={() => setOpen(false)}
                            category={category}
                          />
                        </DialogContent>
                      </Dialog>

                      <button
                        onClick={() => setHandleDeleteClick(category.id)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 ">
              <PaginationArticles
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoriesTable;
