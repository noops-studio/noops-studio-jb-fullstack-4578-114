import React from 'react';
import Welcome from '../components/home/Welcome';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredCategories = [
    { id: 1, name: 'Birthday Gifts', icon: '🎂' },
    { id: 2, name: 'Wedding Gifts', icon: '💍' },
    { id: 3, name: 'Anniversary Gifts', icon: '💝' },
  ];

  return (
    <div>
      <Welcome />
      
      <section className="my-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map(category => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">{category.name}</h3>
              <Link to="/gifts" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Browse Collection →
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="my-16 bg-indigo-50 py-12 px-6 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Why Choose Our Gift Shop?</h2>
          <p className="text-gray-700 mb-8">We offer a curated selection of unique gifts for every occasion, with fast shipping and easy returns.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="bg-white w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Unique Selection</h3>
              <p className="text-gray-600 mt-2">Carefully curated gifts you won't find anywhere else.</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Fast Delivery</h3>
              <p className="text-gray-600 mt-2">Get your gifts quickly with our expedited shipping options.</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 mt-2">Easy returns and exchanges if you're not completely satisfied.</p>
            </div>
          </div>
          
          <Link to="/gifts" className="mt-8 inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition duration-200">
            Explore Our Collection
          </Link>
        </div>
      </section>
      
      <section className="my-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Our Latest Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">Gift Item #{item}</h3>
                <p className="text-gray-600 text-sm mt-1">Perfect for any occasion</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-indigo-600">$24.99</span>
                  <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-200 transition duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/gifts" className="text-indigo-600 hover:text-indigo-800 font-medium">
            View All Gifts →
          </Link>
        </div>
      </section>
      
      <section className="my-16 bg-indigo-600 text-white py-12 px-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="mb-6 max-w-2xl mx-auto">Sign up to receive updates on new gift arrivals, special promotions, and seasonal offers.</p>
        
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow p-3 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button className="bg-indigo-800 px-6 py-3 rounded-r-md font-medium hover:bg-indigo-900 transition duration-200">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;