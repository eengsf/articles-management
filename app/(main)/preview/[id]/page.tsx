'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Article } from '@/types';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import { useFilter } from '@/hooks/useFilter';

export default function PreviewPage() {
  const { id } = useParams() as { id: string };
  const [article, setArticle] = useState<Article | null>(null);

  const { paginatedArticles } = useFilter({ articlesPerPage: 3 });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      const token = localStorage.getItem('token');
      const res = await api.get(`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticle(res.data);
    };

    fetchArticle();
  }, [id]);

  function formatDateToReadable(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  if (!article) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center text-sm text-gray-500 mb-2 justify-center">
        <p>{formatDateToReadable(article.createdAt)}</p>
        <Dot className="w-4 h-4" />
        <p>Created by Admin</p>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
        {article.title}
      </h1>

      <div className="w-full aspect-video mb-8">
        <Image
          src="/images/bg.jpg"
          alt="Article Header"
          width={1920}
          height={1080}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Other Articles
      </h2>

      {paginatedArticles.length === 0 ? (
        <div className="text-center text-gray-500">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => (
            <div key={article.id} className="flex flex-col gap-3">
              <div className="w-full aspect-video">
                <Image
                  src="/images/bg.jpg"
                  alt="Article"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500">
                {formatDateToReadable(article.createdAt)}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.content}
              </p>
              <span className="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1 w-fit">
                {article.category?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
