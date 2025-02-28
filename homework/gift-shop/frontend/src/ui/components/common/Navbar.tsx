import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-indigo-200 font-medium transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/gifts" className="text-white hover:text-indigo-200 font-medium transition duration-200">
              Gifts
            </Link>
          </li>
          <li>
            <Link to="/add-gift" className="text-white hover:text-indigo-200 font-medium transition duration-200">
              Add Gift
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
