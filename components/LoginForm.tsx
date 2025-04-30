/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username field cannot be empty' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type LoginFormType = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    try {
      const response = await api.post('/auth/login', values);
      const { token } = response.data;

      localStorage.setItem('token', token);

      alert('Login berhasil!');
      router.push('/dashboard');
    } catch (error: any) {
      alert('Gagal login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen sm:bg-[#f3f4f6] bg-transparent">
      <Card className="w-full max-w-[400px] border-none sm:border sm:rounded-md">
        <CardHeader>
          <CardTitle className="m-auto w-36 h-6">
            <Image
              src="/logoipsum.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-full bg-cover"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Input username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Input password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Login
              </Button>

              <span className="flex text-sm justify-center">
                <p>
                  Don{`'`}t have an account?{' '}
                  <Link href="/register" className="text-blue-500 underline">
                    Register
                  </Link>
                </p>
              </span>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
