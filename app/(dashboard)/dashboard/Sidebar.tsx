
'use client';

import { useDropdown } from '@/context/DropdownContext';
import { removeToken } from '@/lib/auth';
import { ChevronsLeft, LogOut, Newspaper, Tag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar({
  setActiveTab,
}: {
  setActiveTab: (tab: 'articles' | 'categories') => void;
}) {
  const [activeButton, setActiveButton] = useState<'articles' | 'categories'>(
    'articles'
  );
  const { setIsBurger, isBurger } = useDropdown();
  const handleTabClick = (tab: 'articles' | 'categories') => {
    setActiveButton(tab);
    setActiveTab(tab);
  };

  const router = useRouter();

  const handleLogoutClick = () => {
    removeToken();
    alert('Logout berhasil!');
    router.push('/login');
  };

  const buttonClass = (button: string) =>
    `w-full text-left flex gap-2 hover:bg-blue-200/30 px-5 py-3 rounded-md ${
      activeButton === button ? 'bg-blue-200/30' : ''
    }`;

  return (
    <div className="w-64 h-full bg-blue-500 text-primary-foreground ">
      <div className=" ps-9 py-6 mb-3 relative">
        <button
          onClick={() => setIsBurger(!isBurger)}
          className="absolute flex top-1/2 -translate-y-1/2 -right-9 sm:hidden border-2 border-blue-500 p-2 bg-white w-[70px] rounded-full justify-end"
        >
          <ChevronsLeft className="text-blue-500 " />
        </button>
        <div className="sm:w-[134px] sm:h-6 w-[122px] h-[22px]">
          <Image
            src={'/logoipsum-white.svg'}
            alt="logoipsum-white"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
      <ul className="space-y-2 px-4">
        <li>
          <button
            onClick={() => handleTabClick('articles')}
            className={buttonClass('articles')}
          >
            <Newspaper />
            Articles
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTabClick('categories')}
            className={buttonClass('categories')}
          >
            <Tag />
            Categories
          </button>
        </li>
        <li>
          <button onClick={handleLogoutClick} className={buttonClass('logout')}>
            <LogOut />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
