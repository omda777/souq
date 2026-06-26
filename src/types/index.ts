import { Request } from 'express';

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
    isVerified: boolean;
  };
}

export interface PaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
}