"use client";
import React, { useEffect, useState } from "react";
import { useGetMenProductsQuery } from "@/app/src/lib/services/products";
import { Product } from "@/app/src/types/products";
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline'; 
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { add } from '@/app/src/lib/features/slices/cartslice'; // Adjust path as necessary
import { CartItem } from '@/app/src/types/cart'; // Adjust path as necessary
import Image from 'next/image';

const OurProduct: React.FC = () => {
  const dispatch = useDispatch();
  const { data: products = [], error, isLoading } = useGetMenProductsQuery();
  const [activeCategory, setActiveCategory] = useState('Hot');
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    console.log("Fetched products:", products);
  }, [products]);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

  // Log active category and filtered products
  console.log('Active Category:', activeCategory);
  const filteredProducts = products
    .filter((product: Product) => {
      console.log('Product Category:', product.category); // Debugging log
      return product.category === activeCategory;
    })
    .slice(0, visibleProducts);

  console.log('Filtered Products:', filteredProducts);

  // Function to handle adding a product to the cart
  const handleAdd = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1 // Ensure quantity is initialized
    };

    console.log("Adding to cart:", cartItem); // Debugging log
    dispatch(add(cartItem));
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
          onClick={() => setActiveCategory('Sale')}
        >
          Sale
        </button>
        <button
          className={`${
            activeCategory === 'Hot'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => setActiveCategory('Hot')}
        >
          Hot
        </button>
        <button
          className={`${
            activeCategory === 'New Arrivals'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => setActiveCategory('New Arrivals')}
        >
          New Arrivals
        </button>
        <button
          className={`${
            activeCategory === 'Accessories'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'hover:text-blue-500'
          }`}
          onClick={() => setActiveCategory('Accessories')}
        >
          Accessories
        </button>
      </div>

      {/* Product Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
      >
        {filteredProducts.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          filteredProducts.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="relative text-center bg-white rounded-lg shadow-lg py-4 my-2 w-full sm:w-80 md:w-96 lg:w-64 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors">
                {product.title}
              </h3>
              <div className="flex justify-center items-center mt-2">
                <p className="text-lg sm:text-xl font-bold text-gray-900 hover:text-green-600">
                  ${product.price}
                </p>
                <span className="mx-2 text-gray-600">|</span>
                <p className="text-yellow-500 text-lg">{product.rating?.rate} ★</p>
              </div>
              {/* Hover icons for Add to Cart and View Product */}
              <div className="absolute flex flex-col top-2 right-2 p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-blue-300 text-black font-extrabold p-2 rounded-full"
                  onClick={() => handleAdd(product)}
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                <Link href={`/products/${product.id}`}>
                  <div className="bg-blue-300 text-black font-extrabold p-2 rounded-full">
                    <EyeIcon className="h-5 w-5" />
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-6">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          See All
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default OurProduct;
