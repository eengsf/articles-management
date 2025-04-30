'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDropdown } from '@/context/DropdownContext';
import { usePathname, useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';
import { LogOut } from 'lucide-react';
import { fetchProfile } from '@/lib/fetch';

interface UserProfile {
  username: string;
}

const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { setIsDropdownOpen } = useDropdown(); 
  const pathname = usePathname();
  const isPreview = pathname.startsWith('/preview');

  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await fetchProfile();
        setUser(data);
        setRole(data.role);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setUser(null);
        setRole(null);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = () => {
    removeToken();
    alert('Logout berhasil!');
    setUser(null);
    router.push('/login');
  };

  const accountLink = role === 'Admin' ? '/dashboard' : '/user-profile';
  return (
    <nav className={`flex items-center justify-between sm:py-8 sm:px-16 py-4 px-5 w-full  top-0 z-50 bg-white sm:bg-transparent ${isPreview ? 'static' : 'absolute'}`}>
      <Link href="/" className="flex items-center w-36 h-6">
      {isPreview ? (
        <Image
          src="/logoipsum.svg"
          width={500}
          height={500}
          alt="Logo Seller Pintar"
          priority
          className="object-cover"
        />
      ) : (
        <>
          <Image
            src="/logoipsum-white.svg"
            width={500}
            height={500}
            alt="Logo Seller Pintar"
            priority
            className="object-cover sm:block hidden"
          />
          <Image
            src="/logoipsum.svg"
            width={500}
            height={500}
            alt="Logo Seller Pintar"
            priority
            className="object-cover sm:hidden block"
          />
        </>
      )}
    </Link>

      <div className="space-x-4 flex items-center">
        {user ? (
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center px-0 cursor-pointer hover:bg-transparent"
              >
                <div className="w-10 h-10 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center text-lg uppercase">
                  {user.username.charAt(0)}
                </div>
                <span className={`font-semibold sm:block hidden  underline ${isPreview? 'text-black' : 'text-white'}`}>
                  {capitalizeFirstLetter(user.username)}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 h-[84px] rounded-md flex flex-col justify-between"
            >
              <DropdownMenuItem asChild className="hover:bg-blue-200">
                <Link href={accountLink} className="w-full">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="text-red-500" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
