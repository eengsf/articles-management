'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Articles from '@/components/Articles';
import Categories from '@/components/Categories';
import { fetchProfile } from '@/lib/fetch';
import { Button } from '@/components/ui/button';
import { useDropdown } from '@/context/DropdownContext';
import { ChevronsLeft } from 'lucide-react';

interface UserProfile {
  username: string;
}

const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile>({ username: '' });
  const [activeTab, setActiveTab] = useState<'articles' | 'categories'>(
    'articles'
  );
  const { isBurger } = useDropdown();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await fetchProfile();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setUser({ username: '' });
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`
          fixed z-40 top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300
          sm:relative sm:translate-x-0
          ${isBurger ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1 overflow-auto bg-slate-200">
        <div className="flex items-center justify-between bg-white px-6 py-4 fixed top-0 w-full z-30">
          <div className="flex items-center ">
            <ChevronsLeft className="text-blue-500 sm:hidden block" size={16} />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <Button
            variant="ghost"
            className="flex items-center cursor-pointer hover:bg-transparent"
          >
            <div className="w-10 h-10 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center text-lg uppercase">
              {user.username.charAt(0)}
            </div>
            <span className="font-semibold sm:block hidden underline text-black">
              {capitalizeFirstLetter(user.username)}
            </span>
          </Button>
        </div>

        <div className="pt-[72px]">
          {' '}
          {activeTab === 'articles' && <Articles />}
          {activeTab === 'categories' && <Categories />}
        </div>
      </div>
    </div>
  );
}
