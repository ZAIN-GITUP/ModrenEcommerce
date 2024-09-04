"use client";
import React, { useState } from 'react';
import products from '@/app/src/componenets/products'; // Adjust the path if necessary

const OurProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HOT');

  const tabs = ['SALE', 'HOT', 'NEW ARRIVALS', 'ACCESSORIES'];

  // Filter products based on active tab if necessary
  const filteredProducts = products.filter(product => {
    if (activeTab === 'ACCESSORIES') return product.title === 'Accessories';
    // Add more conditions for other tabs if needed
    return true; // Show all products by default
  });

  return (
    <section className="my-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">Our Products</h2>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg ${activeTab === tab ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredProducts.map((product, index) => (
          <div key={index} className="text-center p-2">
            <img src={product.imgSrc.src} alt={product.title} className="w-full h-auto object-cover rounded-lg" />
            <h3 className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">{product.title}</h3>
            <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg font-bold">{product.price}</p>
            <p className="text-yellow-500 text-xs sm:text-sm md:text-base lg:text-lg">{product.rating} ★</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProducts;
