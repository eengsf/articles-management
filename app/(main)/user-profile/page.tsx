'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import API from '@/lib/axios';

interface UserProfile {
  username: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/auth/profile');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-[400px] shadow-none border-none">
        <CardHeader className="flex flex-col items-center gap-4">
          <CardTitle className="text-xl font-semibold">User Profile</CardTitle>
          <div className="w-16 h-16 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center text-2xl uppercase">
            {user?.username?.charAt(0) ?? 'U'}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex bg-gray-100 py-2.5 px-3 rounded-[6px]">
              <div className="font-medium w-[100px]">Username</div>
              <div className="px-2">:</div>
              <div className="text-center flex-1">{user?.username ?? '-'}</div>
            </div>
            <div className="flex bg-gray-100 py-2.5 px-3 rounded-[6px]">
              <div className="font-medium w-[100px]">Password</div>
              <div className="px-2">:</div>
              <div className="text-center flex-1">********</div>
            </div>
            <div className="flex bg-gray-100 py-2.5 px-3 rounded-[6px]">
              <div className="font-medium w-[100px]">Role</div>
              <div className="px-2">:</div>
              <div className="text-center flex-1">{user?.role ?? '-'}</div>
            </div>
          </div>

          <Button className="w-full" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
