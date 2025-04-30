
'use client';

import { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import CreateArticleForm from './CreateArticleForm';
import { Article } from '@/types';
import EditArticleForm from './EditArticlesForm';
import Filter from './Filter';
import ArticlesTable from './ArticlesTable';
import { useFilter } from '@/hooks/useFilter';
import { Plus } from 'lucide-react';

export default function Articles() {
  const {
    articles,
    loading,
    handleDelete,
    setCreating,
    editingArticle,
    reloadArticles,
    setEditingArticle,
  } = useArticles();

  const {
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    totalArticles,
    paginatedArticles,
    currentPage,
    totalPages,
    goToPage,
  } = useFilter({ articlesPerPage: 10, externalArticles: articles });

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
    setCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setCreating(false);
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
  };

  const handleSuccessCreate = async () => {
    await reloadArticles();
    handleCancelCreate();
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
      {isCreating ? (
        <CreateArticleForm
          onSuccess={handleSuccessCreate}
          onCancel={handleCancelCreate}
        />
      ) : editingArticle ? (
        <EditArticleForm article={editingArticle} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h1 className=" font-semibold p-5">
            Total Articles: {totalArticles}
          </h1>

          <div className="divide-y ">
            <div className="flex gap-5 sm:flex-row flex-col justify-between items-center p-5">
              <Filter
                categories={categories}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                setSearchTerm={setSearchTerm}
                setSelectedCategory={setSelectedCategory}
                component="articles"
              />
              <button
                onClick={handleCreateClick}
                className="bg-blue-600 text-sm text-white px-3 py-2 rounded-md flex items-center gap-2"
              >
                <Plus size={16} /> Add Article
              </button>
            </div>
            <div className="space-y-4">
              {articles.length === 0 ? (
                <div>No articles found.</div>
              ) : (
                <ArticlesTable
                  paginatedArticles={paginatedArticles}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                  setHandleEditClick={handleEditClick}
                  setHandleDeleteClick={handleDelete}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
