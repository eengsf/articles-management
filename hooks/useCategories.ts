'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Category } from '../types';
import { CategorySchema } from '@/lib/validation/validationSchema';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  const router = useRouter();

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

        await reloadCategories();
      } catch (error) {
        console.error('Error:', error);
        alert('Session expired. Silakan login lagi.');
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  const reloadCategories = async () => {
    const token = localStorage.getItem('token');
    const categoriesRes = await api.get('/categories', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const categories = categoriesRes.data.data.map((category: Category) => ({
      ...category,
      id: String(category.id),
    }));

    setCategories(categories);
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateSubmit = async (data: CategorySchema) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/categories', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await reloadCategories();
      alert('Category created successfully!');
      setCreating(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Gagal membuat category.');
    }
  };

  const handleEditSubmit = async (id: string, data: CategorySchema) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Article updated successfully!');
      setEditingCategory(null);
      reloadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Gagal memperbarui category.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Yakin mau hapus category ini?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) => prev.filter((category) => category.id !== id));
      alert('Category berhasil dihapus!');
    } catch (error) {
      console.error('Error saat menghapus category:', error);
      alert('Gagal menghapus category.');
    }
  };

  return {
    categories,
    loading,
    reloadCategories,
    editingCategory,
    creating,
    setCreating,
    setEditingCategory,
    fetchCategories,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
  };
}
