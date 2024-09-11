"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

import products from '@/app/src/componenets/products'; // Adjust the import path as needed

const DesignerClothes: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <motion.h2
        className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        data-aos="fade-up"
      >
        Designer Clothes For You
      </motion.h2>
      <motion.p
        className="text-sm sm:text-base text-center mb-6 sm:mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Immerse yourself in the world of luxury fashion with our meticulously crafted designer clothes!
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            data-aos="fade-up"
            data-aos-delay={`${500 + index * 100}`}
          >
            <Image
              src={product.imgSrc}
              alt={product.title}
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
              width={500} // Adjust width as needed
              height={500} // Adjust height as needed
            />
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{product.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{product.description}</p>
            <div className="flex justify-center items-center mt-2">
              <p className="text-lg sm:text-xl font-bold">{product.price}</p>
              <span className="mx-2 text-gray-600">|</span>
              <p className="text-yellow-500 text-lg">{product.rating} ★</p>
            </div>
            
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DesignerClothes;
