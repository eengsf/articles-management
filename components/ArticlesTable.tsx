
'use client';

import React from 'react';
import { Article } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationArticles from './PaginationArticles';
import Image from 'next/image';
import Link from 'next/link';

interface ContentProps {
  paginatedArticles: Article[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  setHandleEditClick: (article: Article) => void;
  setHandleDeleteClick: (article: string) => void;
}

function ArticlesTable({
  paginatedArticles,
  currentPage,
  totalPages,
  goToPage,
  setHandleEditClick,
  setHandleDeleteClick,
  
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
    <div className="w-full">
      {paginatedArticles.length === 0 ? (
        <div className="text-center text-gray-500">No articles found.</div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <Table className="w-full ">
              <TableHeader>
                <TableRow className='bg-slate-100'>
                  <TableHead className="w-1/5 text-center">
                    Thumbnails
                  </TableHead>
                  <TableHead className="w-1/5 text-center">Title</TableHead>
                  <TableHead className="w-1/5 text-center">Category</TableHead>
                  <TableHead className="w-1/5 text-center">
                    Created At
                  </TableHead>
                  <TableHead className="w-1/5 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="w-1/5">
                      <div className="aspect-square w-14 overflow-hidden rounded-md mx-auto">
                        <Image
                          src="/images/bg.jpg"
                          alt="article-image"
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell className=" w-1/5 text-slate-600 text-start overflow-x-hidden">
                      {article.title}
                    </TableCell>

                    <TableCell className="w-1/5 text-slate-600 text-center ">
                      {article.category?.name || '-'}
                    </TableCell>
                    <TableCell className="w-1/5 text-slate-600 text-center ">
                      {formatDateToReadable(article.createdAt)}
                    </TableCell>
                    <TableCell className="w-1/5 text-center space-x-2">
                      <Link href={`/preview/${article.id}`} className="text-blue-500 underline">
                        Preview
                      </Link>
                      <button onClick={() => setHandleEditClick(article)} className="text-blue-500 underline">
                        Edit
                      </button>
                      <button  onClick={() => setHandleDeleteClick(article.id)} className="text-red-500 underline">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
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

export default ArticlesTable;
