import React, { useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { getProductsByCategory, deleteProduct } from '../../services/productService';
import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
  categoryId: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const fetchProducts = async () => {
    if (!categoryId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProducts = await getProductsByCategory(categoryId);
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const handleDeleteProduct = async (id: string) => {
    try {
      setDeletingProductId(id);
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError('Failed to delete product. Please try again later.');
      console.error('Error deleting product:', err);
    } finally {
      setDeletingProductId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            isDeleting={deletingProductId === product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;