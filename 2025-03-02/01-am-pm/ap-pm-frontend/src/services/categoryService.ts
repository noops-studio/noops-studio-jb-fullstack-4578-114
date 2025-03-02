import api from './api';
import { Category, CategoryDetail } from '../models/Category';

interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>('/api/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id: string): Promise<CategoryDetail> => {
  try {
    const response = await api.get<ApiResponse<CategoryDetail>>(`/api/categories/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
};