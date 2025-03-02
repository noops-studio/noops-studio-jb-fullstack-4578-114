import { Category } from './Category';

export interface Product {
  id: string;
  name: string;
  manufacturingDate: string;
  expirationDate: string;
  categoryId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface CreateProductPayload {
  name: string;
  manufacturingDate: string; // ISO date format
  expirationDate: string;    // ISO date format
  categoryId: string;
  price: number;
}