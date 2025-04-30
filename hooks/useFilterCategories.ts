import { useEffect, useState } from 'react';
import { Category } from '@/types';
import { fetchCategories } from '@/lib/fetch';
import { useDebounce } from '@/hooks/useDebounce';

interface UseFilterOptions {
    categoriesPerPage?: number;
    externalCategories?: Category[];
}

export const useFilterCategories = ({
  categoriesPerPage = 9,
  externalCategories,
}: UseFilterOptions = {}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 400);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        if (!externalCategories) {
          const categoriesData = await fetchCategories();
          setCategories(categoriesData || []);
          setTotalCategories(categoriesData.length);
        } else {
          setCategories(externalCategories);
          setTotalCategories(externalCategories.length);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [externalCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const filteredCategories = categories.filter((category) => {
    const matchesSearchTerm = category.name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const paginatedCategory = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    categories,
    searchTerm,
    setSearchTerm,
    filteredCategories,
    paginatedCategory,
    currentPage,
    goToPage,
    totalPages,
    isLoading,
    totalCategories,
  };
};
