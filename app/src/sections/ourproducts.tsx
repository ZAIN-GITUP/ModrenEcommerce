"use client";
import React, { useState, useEffect } from 'react';
import img from '@/public/product2.png';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ChevronRightIcon } from '@heroicons/react/20/solid';

const products = [
  {
    id: 1,
    category: 'Sale',
    name: 'Spread Collar Shirt',
    price: '$48.99',
    rating: 5.0,
    image: img,
  },
  {
    id: 2,
    category: 'Sale',
    name: 'White Solid Formal Shirt',
    price: '$39.00',
    rating: 4.9,
    image: img,
  },
  {
    id: 3,
    category: 'Sale',
    name: 'Printed Loose T-shirt',
    price: '$39.99',
    rating: 5.0,
    image: img,
  },
  {
    id: 4,
    category: 'Hot',
    name: 'Gray Solid Padded Jacket',
    price: '$32.99',
    rating: 4.7,
    image: img,
  },
  {
    id: 5,
    category: 'Hot',
    name: 'Shine On Me Blouse',
    price: '$42.99',
    rating: 4.8,
    image: img,
  },
  {
    id: 6,
    category: 'Hot',
    name: 'Summer Wind Crop Shirt',
    price: '$39.95',
    rating: 4.7,
    image: img,
  },
  {
    id: 7,
    category: 'Accessories',
    name: 'Tailored Jacket',
    price: '$46.00',
    rating: 4.9,
    image: img,
  },
  {
    id: 8,
    category: 'Accessories',
    name: 'Shine On Me Blouse',
    price: '$42.99',
    rating: 4.8,
    image: img,
  },
  {
    id: 9,
    category: 'New Arrivals',
    name: 'Summer Wind Crop Shirt',
    price: '$39.95',
    rating: 4.7,
    image: img,
  },
  {
    id: 10,
    category: 'Accessories',
    name: 'Tailored Jacket',
    price: '$46.00',
    rating: 4.9,
    image: img,
  },
  {
    id: 11,
    category: 'New Arrivals',
    name: 'Summer Wind Crop Shirt',
    price: '$39.95',
    rating: 4.7,
    image: img,
  },
  {
    id: 12,
    category: 'New Arrivals',
    name: 'Summer Wind Crop Shirt',
    price: '$39.95',
    rating: 4.7,
    image: img,
  },
];

const OurProduct = () => {
  const [activeCategory, setActiveCategory] = useState('Hot');
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setVisibleProducts(3); // Reset visible products to 3 when category changes
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold text-center mb-6" data-aos="fade-up">
        Our Products
      </h2>

      {/* Category Tabs */}
      <div
        className="grid grid-cols-2 gap-4 justify-center mb-6 max-w-sm mx-auto sm:flex sm:space-x-6"
        data-aos="fade-up"
      >
        <button
          className={`${
            activeCategory === 'Sale'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => handleCategoryClick('Sale')}
        >
          Sale
        </button>
        <button
          className={`${
            activeCategory === 'Hot'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => handleCategoryClick('Hot')}
        >
          Hot
        </button>
        <button
          className={`${
            activeCategory === 'New Arrivals'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => handleCategoryClick('New Arrivals')}
        >
          New Arrivals
        </button>
        <button
          className={`${
            activeCategory === 'Accessories'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => handleCategoryClick('Accessories')}
        >
          Accessories
        </button>
      </div>

      {/* Product Grid */}
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto px-4 md:px-12 lg:px-24 max-w-screen-xl justify-items-center"
      >
        {filteredProducts.slice(0, visibleProducts).map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col items-center gap-6 mt-8"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Adds a slight delay to each item
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="mt-4 text-lg sm:text-xl font-semibold text-center">{product.name}</h3>
            <div className="flex justify-center items-center mt-2">
              <p className="text-lg sm:text-xl font-bold">{product.price}</p>
              <span className="mx-2 text-gray-600">|</span>
              <p className="text-yellow-500 text-lg">{product.rating} ★</p>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-6" data-aos="fade-up" data-aos-delay="600">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          See All
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default OurProduct;
