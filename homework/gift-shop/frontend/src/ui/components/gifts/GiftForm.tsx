import React, { useState, useEffect } from 'react';
import { Gift } from '../../../backend/models/Gift';
import { Target } from '../../../backend/models/Target';
import targetService from '../../../backend/services/targetService';
import { validateGift } from '../../../backend/utils/validation';
import giftService from '../../../backend/services/giftService';

interface GiftFormProps {
  onGiftAdded: () => void;
}

const GiftForm: React.FC<GiftFormProps> = ({ onGiftAdded }) => {
  const [gift, setGift] = useState<Partial<Gift>>({
    targetId: 0,
    name: '',
    description: '',
    price: 0,
    discount: 0
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [targets, setTargets] = useState<Target[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchTargets = async () => {
      const data = await targetService.getTargets();
      setTargets(data);
    };
    fetchTargets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGift((prev) => ({ 
      ...prev, 
      [name]: name === 'targetId' || name === 'price' || name === 'discount' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateGift(gift as Gift);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await giftService.addGift(gift);
      setGift({ targetId: 0, name: '', description: '', price: 0, discount: 0 });
      setErrors([]);
      onGiftAdded();
    } catch (error) {
      setErrors(['An error occurred while adding the gift. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200">
          {errors.map((err, idx) => (
            <div key={idx} className="flex items-center mb-1 last:mb-0">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              {err}
            </div>
          ))}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Target Audience:</label>
        <select 
          name="targetId" 
          value={gift.targetId} 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={0}>Select Target</option>
          {targets.map((target) => (
            <option key={target.id} value={target.id}>{target.type}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Name:</label>
        <input 
          type="text" 
          name="name" 
          value={gift.name} 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Description:</label>
        <textarea 
          name="description" 
          value={gift.description} 
          onChange={handleChange} 
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price ($):</label>
          <input 
            type="number" 
            name="price" 
            value={gift.price} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Discount (%):</label>
          <input 
            type="number" 
            name="discount" 
            value={gift.discount} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : 'Add Gift'}
      </button>
    </form>
  );
};

export default GiftForm;
