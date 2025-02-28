import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="text-center py-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Welcome to the Gift Shop!</h2>
      <p className="text-lg text-gray-700 mb-6">Find the perfect gift for every occasion.</p>
      <img 
        src="src/assets/images/DALL·E 2025-02-28 21.51.18 - A cozy and inviting gift shop with shelves filled with colorful presents, neatly wrapped gift boxes, and decorative ribbons. The shop has a warm ambia.webp" 
        alt="Gift Shop" 
        className="mt-6 mx-auto rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default Welcome;