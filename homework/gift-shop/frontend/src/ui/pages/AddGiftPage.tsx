import React, { useState } from 'react';
import GiftForm from '../components/gifts/GiftForm';

const AddGiftPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleGiftAdded = () => {
    setMessage('Gift added successfully!');
    setShowMessage(true);
    
    // Auto-hide the message after 5 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add a New Gift</h2>
      
      {showMessage && (
        <div className="max-w-2xl mx-auto mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button 
                  onClick={() => setShowMessage(false)}
                  className="inline-flex text-green-500 hover:text-green-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <GiftForm onGiftAdded={handleGiftAdded} />
    </div>
  );
};

export default AddGiftPage;