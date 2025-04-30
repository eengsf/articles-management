
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdAt: string;
}

