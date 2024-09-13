"use client";
import React, { useEffect } from 'react';
import { useGetMenProductsQuery } from '@/app/src/lib/services/products'; // Make sure the path is correct
import { Product } from '@/app/src/types/products';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DesignerClothes: React.FC = () => {
  const { data: products, error, isLoading } = useGetMenProductsQuery();

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

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

  // Limit to 3 products
  const limitedProducts = products?.slice(0, 3);

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
        {limitedProducts?.map((product: Product, index: number) => (
          <motion.div
            key={product.id}
            className="text-center bg-white rounded-lg shadow-lg py-4 my-2 w-full sm:w-80 md:w-96 lg:w-64"
            variants={itemVariants}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="mt-4 text-lg sm:text-xl font-semibold">{product.title}</h3>
            <div className="flex justify-center items-center mt-2">
              <p className="text-lg sm:text-xl font-bold">{product.price}</p>
              <span className="mx-2 text-gray-600">|</span>
              <p className="text-yellow-500 text-lg">{product.rating?.rate} ★</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DesignerClothes;
