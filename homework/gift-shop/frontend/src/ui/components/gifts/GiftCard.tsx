import React, { useState } from 'react';
import giftService from '../../../backend/services/giftService';
import { Gift } from '../../../backend/models/Gift';

interface GiftCardProps {
  gift: Gift;
  onDelete: (id: number) => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  
  const finalPrice = gift.price * (1 - gift.discount / 100);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await giftService.deleteGift(gift.id);
      onDelete(gift.id);
    } catch (error) {
      console.error("Failed to delete gift:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800 mb-2">{gift.name}</h3>
        <p className="text-gray-600 mb-4">{gift.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            {gift.discount > 0 ? (
              <div>
                <span className="line-through text-gray-500 mr-2">${gift.price.toFixed(2)}</span>
                <span className="text-lg font-bold text-indigo-600">${finalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-indigo-600">${gift.price.toFixed(2)}</span>
            )}
          </div>
          
          {gift.discount > 0 && (
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {gift.discount}% OFF
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded font-medium hover:bg-indigo-200 transition duration-200">
            View Details
          </button>
          
          {!showConfirm ? (
            <button 
              onClick={handleDeleteClick} 
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleCancelDelete}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Confirm'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
