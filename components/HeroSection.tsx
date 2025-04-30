
'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import { useDropdown } from '@/context/DropdownContext';
import { Category } from '@/types';

function HeroSection({
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const { isDropdownOpen } = useDropdown();

  return (
    <div className="w-full h-screen bg-image text-white sm:px-[100px] px-5">
      <div className="w-full h-full relative z-10 flex flex-col justify-center items-center pt-8">
        {isDropdownOpen && (
          <div className="fixed inset-0 bg-black/40 z-40"></div>
        )}
        <div className="max-w-[730px] flex flex-col gap-10 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-base">Blog genzet</h2>
            <h1 className="text-5xl font-medium">
              The Journal: Design Resources, Interviews, and Industry News
            </h1>
            <h2 className="text-2xl font-normal">
              Your daily dose of design insights!
            </h2>
          </div>
          <div className="flex sm:flex-row flex-col gap-2 justify-center items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="sm:w-[180px] w-full bg-white text-black">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Select category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="relative sm:w-[400px] w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
