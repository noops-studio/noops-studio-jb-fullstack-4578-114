import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <h1 className="text-2xl font-bold">Gift Shop</h1>
        <div className="ml-auto flex items-center space-x-4">
          <button className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium shadow hover:bg-indigo-100 transition duration-200">
            Sign In
          </button>
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
