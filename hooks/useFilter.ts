
import { useEffect, useState } from 'react';
import { Article, Category } from '@/types';
import { fetchArticles, fetchCategories } from '@/lib/fetch';
import { useDebounce } from '@/hooks/useDebounce';

interface UseFilterOptions {
  articlesPerPage?: number; 
  externalArticles?: Article[];
}

export const useFilter = ({ articlesPerPage = 9, externalArticles }: UseFilterOptions = {}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 400);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        if (!externalArticles) {
          const articlesData = await fetchArticles();
          setArticles(articlesData || []);
          setTotalArticles(articlesData.length);
        } else {
          setArticles(externalArticles);
          setTotalArticles(externalArticles.length);
        }

        const categoriesData = await fetchCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [externalArticles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category.id === selectedCategory;
    const matchesSearchTerm =
      article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const paginatedArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    articles,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredArticles,
    paginatedArticles,
    currentPage,
    goToPage,
    totalPages,
    isLoading,
    totalArticles,
  };
};

