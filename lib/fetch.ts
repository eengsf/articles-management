import api from '@/lib/axios';

export const fetchArticles = async () => {
  try {
    const res = await api.get('/articles');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};
export const fetchCategories = async () => {
  try {
    const res = await api.get('/categories');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchProfile = async () => {
  try {
    const res = await api.get('/auth/profile');
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};