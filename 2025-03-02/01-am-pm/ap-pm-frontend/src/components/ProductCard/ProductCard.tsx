import React from 'react';
import { Product } from '../../models/Product';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, isDeleting = false }) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format price with ILS currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {product.category?.name || 'Unknown'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Price:</span> {formatPrice(product.price)}
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Manufacturing Date:</span>{' '}
            {formatDate(product.manufacturingDate)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Expiration Date:</span> {formatDate(product.expirationDate)}
          </p>
        </div>
        <div className="mt-4">
          <Button
            variant="danger"
            onClick={() => onDelete(product.id)}
            isLoading={isDeleting}
            className="w-full"
          >
            Delete Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;