import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../models/Category';
import { CreateProductPayload } from '../../models/Product';
import { getAllCategories } from '../../services/categoryService';
import { createProduct } from '../../services/productService';
import Button from '../common/Button';
import Input from '../common/Input';

interface FormErrors {
  name?: string;
  manufacturingDate?: string;
  expirationDate?: string;
  categoryId?: string;
  price?: string;
  general?: string;
}

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    manufacturingDate: '',
    expirationDate: '',
    categoryId: '',
    price: 0,
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
        
        // Set default category if available
        if (fetchedCategories.length > 0 && !formData.categoryId) {
          setFormData((prevData) => ({
            ...prevData,
            categoryId: fetchedCategories[0].id,
          }));
        }
      } catch (err) {
        setLoadingError('Failed to load categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear errors for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    // Validate dates
    if (!formData.manufacturingDate) {
      newErrors.manufacturingDate = 'Manufacturing date is required';
    }
    
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
    }
    
    // Validate that expiration date is after manufacturing date
    if (
      formData.manufacturingDate &&
      formData.expirationDate &&
      new Date(formData.expirationDate) <= new Date(formData.manufacturingDate)
    ) {
      newErrors.expirationDate = 'Expiration date must be after manufacturing date';
    }
    
    // Validate category
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    // Validate price
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createProduct(formData);
      // Redirect to home page after successful submission
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to add product. Please try again.';
      setErrors({
        ...errors,
        general: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4 mt-4"></div>
        </div>
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {loadingError}
        <div className="mt-4">
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 mb-4">
          {errors.general}
        </div>
      )}
      
      <Input
        type="text"
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter product name"
        required
      />
      
      <div className="mb-4">
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className={`w-full px-3 py-2 border ${
            errors.categoryId ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
      </div>
      
      <Input
        type="number"
        name="price"
        label="Price (ILS)"
        value={formData.price.toString()}
        onChange={handleChange}
        error={errors.price}
        step="0.01"
        min="0.01"
        placeholder="Enter price"
        required
      />
      
      <Input
        type="datetime-local"
        name="manufacturingDate"
        label="Manufacturing Date"
        value={formData.manufacturingDate}
        onChange={handleChange}
        error={errors.manufacturingDate}
        required
      />
      
      <Input
        type="datetime-local"
        name="expirationDate"
        label="Expiration Date"
        value={formData.expirationDate}
        onChange={handleChange}
        error={errors.expirationDate}
        required
      />
      
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Add Product
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;