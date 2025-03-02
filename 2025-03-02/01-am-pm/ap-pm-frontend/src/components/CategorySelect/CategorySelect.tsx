import React, { useEffect, useState } from 'react';
import { Category } from '../../models/Category';
import { getAllCategories } from '../../services/categoryService';

interface CategorySelectProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  onSelectCategory,
  selectedCategoryId,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
        
        // Automatically select the first category if none is selected
        if (!selectedCategoryId && fetchedCategories.length > 0) {
          onSelectCategory(fetchedCategories[0].id);
        }
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [onSelectCategory, selectedCategoryId]);

  if (isLoading) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <div className="animate-pulse h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Category
      </label>
      <select
        id="category-select"
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={selectedCategoryId || ''}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        {categories.length === 0 ? (
          <option value="" disabled>
            No categories available
          </option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default CategorySelect;