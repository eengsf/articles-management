
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useArticles } from '@/hooks/useArticles';
import { useEffect, useState } from 'react';
import {
  articleSchema,
  ArticleSchema,
} from '@/lib/validation/validationSchema';
import { fetchCategories } from '@/lib/fetch';
import { Category } from '@/types';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import InputTiptapEditor from './InputTiptapEditor';

interface CreateArticleFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CreateArticleForm({
  onCancel,
  onSuccess,
}: CreateArticleFormProps) {
  const { handleCreateSubmit } = useArticles();
  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
  });

  const content = watch('content');

  useEffect(() => {
    const getData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
        setThumbnailError(false); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
        setThumbnailError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (data: ArticleSchema) => {
    if (!thumbnail) {
      setThumbnailError(true);
      return;
    }

    await handleCreateSubmit(data);
    onSuccess();
  };

  return (
    <>
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-2 p-5 cursor-pointer"
      >
        <ArrowLeft size={16} />
        <h2 className=" font-semibold ">Create Articles</h2>
      </button>

      <div className="w-full p-5">
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 flex flex-col"
        >
          <div>
            <label className="font-semibold block mb-2">Thumbnails</label>
            <label
              htmlFor="thumbnail"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`flex flex-col items-center justify-center border-2 border-dashed ${
                thumbnailError ? 'border-red-500' : 'border-gray-300'
              } rounded-xl h-48 aspect-4/3 cursor-pointer hover:border-blue-400 transition duration-200 relative`}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="object-contain h-full w-full rounded-xl"
                  width={500}
                  height={500}
                  priority
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <p className="text-sm underline">Click to select files</p>
                  <p className="text-sm">Support File Type: jpg or png</p>
                </div>
              )}
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </label>
            {thumbnailError && (
              <p className="text-red-500 text-sm mt-1">
                Thumbnail is required.
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              {...register('title')}
              placeholder="Input title"
              className="w-full border rounded px-3 py-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register('categoryId')}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-lg">Content</label>
            <InputTiptapEditor
              value={content}
              onChange={(html) =>
                setValue('content', html, { shouldValidate: true })
              }
              error={errors.content?.message}
            />
            <input
              type="hidden"
              {...register('content', { required: 'Content is required' })}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white text-black px-4 py-2 rounded cursor-pointer text-sm border hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-gray-200 text-black px-4 py-2 rounded cursor-pointer text-sm hover:bg-gray-300"
            >
              Preview
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
