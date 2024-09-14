"use client";
import React, { useEffect } from "react";
import { useGetMenProductsQuery } from "@/app/src/lib/services/products";
import { Product } from "@/app/src/types/products";
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { add } from '@/app/src/lib/features/slices/cartslice'; // Adjust path as necessary
import { CartItem } from '@/app/src/types/cart'; // Adjust path as necessary

const DesignerClothes: React.FC = () => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetMenProductsQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

  // Limit to 3 products
  const limitedProducts = products?.slice(0, 3);

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
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
        Designer Clothes For You
      </h2>
      <p className="text-sm sm:text-base text-center mb-6 sm:mb-12">
        Immerse yourself in the world of luxury fashion with our meticulously crafted designer clothes!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {limitedProducts?.map((product: Product, index: number) => (
          <div
            key={product.id}
            className="relative text-center bg-white rounded-lg shadow-lg py-4 my-2 w-full sm:w-80 md:w-96 lg:w-64 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img
              src={product.image}
              alt={product.title}
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
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          See All
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DesignerClothes;
