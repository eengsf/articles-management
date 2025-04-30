// types/auth.ts
export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    role: 'admin' | 'user';
  }
  