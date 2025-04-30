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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username field cannot be empty' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['User', 'Admin']),
});

type RegisterFormType = z.infer<typeof formSchema>;


function RegisterForm() {
    const router = useRouter();
      const [showPassword, setShowPassword] = useState(false);
    
      const form = useForm<RegisterFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          password: '',
          role: undefined,
        },
      });
    
      const onSubmit = async (values: RegisterFormType) => {
        try {
          console.log('Data yang dikirim:', values); 
          await api.post('/auth/register', values);
          alert('Registrasi berhasil!');
          router.push('/login');
        } catch (error: any) {
          alert('Gagal register: ' + (error.response?.data?.message || error.message));
        }
      };
    
  return (
    <Card className="w-full max-w-[400px] border-none sm:border sm:rounded-md">
            <CardHeader>
              <CardTitle className="m-auto w-36 h-6">
                <Image src="/logoipsum.svg" alt="Logo" width={100} height={100} priority className="w-full bg-cover" />
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
                              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
    
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="User">User</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
    
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                    Register
                  </Button>
    
                  <span className="flex text-sm justify-center">
                    <p>
                      Already have an account?{' '}
                      <Link href="/login" className="text-blue-500 underline">
                        Login
                      </Link>
                    </p>
                  </span>
                </form>
              </Form>
            </CardContent>
          </Card>
  )
}

export default RegisterForm