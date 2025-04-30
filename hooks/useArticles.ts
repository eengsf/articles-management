'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { removeToken } from '@/lib/auth';
import { 
  Article, 
} from '../types';
import { ArticleSchema } from '@/lib/validation/validationSchema';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    alert('Logout berhasil!');
    router.push('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const profile = await api.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profile.data.role !== 'Admin') {
          alert('Akses ditolak. Hanya Admin yang bisa mengakses.');
          router.push('/');
          return;
        }

        await reloadArticles();
      } catch (error) {
        console.error('Error:', error);
        alert('Session expired. Silakan login lagi.');
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  const reloadArticles = async () => {
    const token = localStorage.getItem('token');
    const articlesRes = await api.get('/articles', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const articles = articlesRes.data.data.map((article: Article) => ({
      ...article,
      id: String(article.id),
    }));

    setArticles([...articles]);
    setLoading(false);
  };

  const handleCreateSubmit = async (data: ArticleSchema) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/articles', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await reloadArticles();
      alert('Article created successfully!');
      setCreating(false);
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Gagal membuat article.');
    }
  };

  const handleEditSubmit = async (id: string, data: ArticleSchema) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/articles/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedArticle = {
        ...res.data,
        id: String(res.data.id),
      };
  
      setArticles((prev) =>
        prev.map((article) => (article.id === id ? updatedArticle : article))
      );
  
      alert('Article updated successfully!');
      setEditingArticle(null);
      await reloadArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Gagal memperbarui article.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Yakin mau hapus artikel ini?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles((prev) => prev.filter((article) => article.id !== id));
      alert('Artikel berhasil dihapus!');
    } catch (error) {
      console.error('Error saat menghapus artikel:', error);
      alert('Gagal menghapus artikel.');
    }
  };

  return {
    articles,
    loading,
    reloadArticles,
    editingArticle,
    creating,
    setCreating,
    setEditingArticle,
    handleLogout,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
  };
}
