'use client';

import Content from '@/components/Content';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import { useFilter } from '@/hooks/useFilter';

function Page() {
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
    isLoading,
  } = useFilter({ articlesPerPage: 9 });

  return (
    <>
      <Navbar />
      <HeroSection
        categories={categories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          <Content
            paginatedArticles={paginatedArticles}
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            totalArticles={totalArticles}
          />
        </>
      )}
      <Footer />
    </>
  );
}

export default Page;
