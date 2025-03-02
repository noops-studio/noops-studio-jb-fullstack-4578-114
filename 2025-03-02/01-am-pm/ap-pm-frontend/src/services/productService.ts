import api from './api';
import { Product, CreateProductPayload } from '../models/Product';

interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>(`/api/products/category/${categoryId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const createProduct = async (product: CreateProductPayload): Promise<Product> => {
  try {
    const response = await api.post<ApiResponse<Product>>('/api/products', product);
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete<ApiResponse<void>>(`/api/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};