'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/hooks/useCategories';
import { useEffect } from 'react';
import {
    CategorySchema,
    categorySchema,
} from '@/lib/validation/validationSchema';


interface CreateCategoryFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CreateCategoryForm({
  onCancel,
  onSuccess,
}: CreateCategoryFormProps) {
  const { handleCreateSubmit, fetchCategories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const submit = async (data: CategorySchema) => {
    await handleCreateSubmit(data);
    onSuccess(); 
  };

  return (
    <>
      <h1 className="text-lg font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register('name')}
            placeholder='Input category'
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        

        <div className="flex gap-2 justify-end">
         
          <button
            type="button"
            onClick={onCancel}
            className="bg-white text-black px-4 py-2 rounded cursor-pointer text-sm border hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
