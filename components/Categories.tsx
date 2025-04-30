
'use client';

import { useState } from 'react';
import Filter from './Filter';
import { Plus } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useFilterCategories } from '@/hooks/useFilterCategories';
import CategoriesTable from './CategoriesTable';
import CreateCategoryForm from './CreateCategoryForm';
import { Category } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const {
    categories,
    loading,
    handleDelete,
    setEditingCategory,
  } = useCategories();

  const {
    searchTerm,
    setSearchTerm,
    paginatedCategory,
    currentPage,
    goToPage,
    totalPages,
    totalCategories,
  } = useFilterCategories({
    categoriesPerPage: 10,
    externalCategories: categories,
  });

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
  };

  if (loading) {
    return (
      <div className="m-5 flex justify-center items-center w-full h-1/2">
        <div className="w-16 h-16 border-8 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="m-5 bg-slate-100 rounded-xl divide-y">
      <h1 className=" font-semibold p-5">
        Total Categories: {totalCategories}
      </h1>

      <div className=" divide-y ">
        <div className="flex sm:flex-row flex-col gap-5 justify-between sm:items-center items-start p-5">
          <Filter
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            component="category"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white  px-3 py-2 rounded-md flex items-center gap-2"
              >
                {' '}
                <Plus size={16} /> Add Category
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
              </DialogHeader>
              <CreateCategoryForm
                onCancel={() => setOpen(false)}
                onSuccess={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4">
          {categories.length === 0 ? (
            <div>No articles found.</div>
          ) : (
            <CategoriesTable
              paginatedCategory={paginatedCategory}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
              setHandleEditClick={handleEditClick}
              setHandleDeleteClick={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
