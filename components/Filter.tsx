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
import { Category } from '@/types';

function Filter({
  categories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  component
}: {
  categories: Category[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  component: string;
}) {
  
  return (
    <div className='flex gap-2'>
      <div className={`${component === 'category' ? 'hidden' : 'block' }`}>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className={`${component === 'articles' ? 'sm:w-fit' : 'sm:w-[180px]'} w-full bg-white text-black font-semibold`}>
          <SelectValue placeholder={`${component === 'articles' ? 'Category' : 'Select category'}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">{`${component === 'articles' ? 'Category' : 'Select category'}`}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
      <div className={`relative ${component === 'articles' || component === 'category' ? 'w-fit' : 'sm:w-[400px]'}  w-fit`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={`${component === 'articles' ? 'Search by title' : 'Search articles'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full bg-white text-black"
        />
      </div>
    </div>
  );
}

export default Filter;
