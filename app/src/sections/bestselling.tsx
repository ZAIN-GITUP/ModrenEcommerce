import Image from 'next/image';
import React from 'react';
import products from '@/app/src/componenets/products'; // Adjust the path as necessary
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const BestSelling: React.FC = () => {
  return (
    <section className="text-center my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Best Selling</h2>
      <p className="mt-2 text-gray-600 text-sm sm:text-base lg:text-lg">
        Get in on the trend with our curated selection of best-selling styles.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {/* Individual product cards */}
        {products.map((product, index) => (
          <div key={index} className="text-center bg-white rounded-lg shadow-lg p-4 m-2 w-full sm:w-80 md:w-96 lg:w-64">
            <Image
              src={product.imgSrc}
              alt={product.title}
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="mt-4 text-lg sm:text-xl font-semibold">{product.title}</h3>
            <div className="flex justify-center items-center mt-2">
              <p className="text-lg sm:text-xl font-bold">{product.price}</p>
              <span className="mx-2 text-gray-600">|</span>
              <p className="text-yellow-500 text-lg">{product.rating} ★</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          See All
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default BestSelling;
