import Image from 'next/image';
import React from 'react';
import products from '@/app/src/componenets/products'; // Adjust the import path as needed

const DesignerClothes = () => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
        Designer Clothes For You
      </h2>
      <p className="text-sm sm:text-base text-center mb-6 sm:mb-12">
        Immerse yourself in the world of luxury fashion with our meticulously
        crafted designer clothes!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <Image
              src={product.imgSrc}
              alt={product.title}
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
              width={500} // Adjust width as needed
              height={500} // Adjust height as needed
            />
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{product.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{product.description}</p>
            <p className="text-xl font-bold mt-2">{product.price}</p>
            <p className="text-yellow-500 text-lg">{product.rating} ★</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerClothes;
