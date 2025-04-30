
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/hooks/useCategories';
import { useEffect } from 'react';
import { Category } from '@/types';
import {
  CategorySchema,
  categorySchema,
} from '@/lib/validation/validationSchema';

interface EditCategoryFormProps {
  category: Category;
  onCancel: () => void;
}

export default function EditCategoryForm({
  category,
  onCancel,
}: EditCategoryFormProps) {
  const { handleEditSubmit, fetchCategories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = (data: CategorySchema) => {
    if (category?.id) {
      handleEditSubmit(category.id, data);
      onCancel();
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register('name')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        


        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
