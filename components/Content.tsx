
'use client';

import React from 'react';
import { Article } from '@/types';
import Image from 'next/image';
import PaginationArticles from './PaginationArticles';

interface ContentProps {
  paginatedArticles: Article[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  totalArticles: number;
}

function Content({
  paginatedArticles,
  currentPage,
  totalPages,
  goToPage,
  totalArticles
}: ContentProps) {
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
    <div className="w-full mx-auto sm:px-[100px] sm:pt-10 sm:pb-[100px] px-5 pt-10 pb-[60px]">
      <h2 className="text-base text-slate-600 mb-6">Showing : {paginatedArticles.length} of {totalArticles} articles</h2>

      {paginatedArticles.length === 0 ? (
        <div className="text-center text-gray-500">No articles found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4 mb-11">
                <div className="w-full aspect-video">
                  <Image
                    src={'/images/bg.jpg'} 
                    alt="image"
                    width={500}
                    height={500}
                    className="object-cover rounded-xl"
                  />
                </div>
                <p className="text-sm text-slate-600">
                  {formatDateToReadable(article.createdAt)}
                </p>
                <h3 className="text-lg font-semibold text-black line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-base line-clamp-3">
                  {article.content}
                </p>
                <span className="w-fit text-sm bg-blue-200 text-blue-900 font-normal rounded-full px-3 py-1">
                  {article.category?.name}
                </span>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationArticles

              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Content;
