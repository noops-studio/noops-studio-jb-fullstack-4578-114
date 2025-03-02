import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import ProductList from '../components/ProductList/ProductList';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">AM:PM Products</h1>
        <Link to="/add-product">
          <Button variant="primary">
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <CategorySelect 
          onSelectCategory={handleCategorySelect} 
          selectedCategoryId={selectedCategoryId} 
        />
      </div>

      {selectedCategoryId && <ProductList categoryId={selectedCategoryId} />}
    </div>
  );
};

export default Home;