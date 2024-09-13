"use client";
import React, { useEffect } from "react";
import { useGetMenProductsQuery } from "@/app/src/lib/services/products";
import { Product } from "@/app/src/types/products";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link"; // Import Link from Next.js

const BestSelling: React.FC = () => {
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

  // Filter for women's clothes and limit to 3 products
  const womenProducts = products
    ?.filter((product) => product.category === "women's clothing")
    .slice(0, 3);

  return (
    <section className="text-center my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-aos="fade-up">
        Best Selling
      </h2>
      <p
        className="mt-2 text-gray-600 text-sm sm:text-base lg:text-lg"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Get in on the trend with our curated selection of best-selling styles.
      </p>
      <div
        className="flex flex-wrap justify-center gap-6 mt-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {womenProducts?.map((product: Product, index: number) => (
          <div
            key={product.id}
            className="relative text-center bg-white rounded-lg shadow-lg p-4 m-2 w-full sm:w-80 md:w-96 lg:w-64 transition-transform transform hover:scale-105 hover:shadow-2xl"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            {/* Product Title with Link */}
            <Link href={`/products/${product.id}`} passHref>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer">
                {product.title}
              </h3>
            </Link>

            {/* Product Price and Rating */}
            <div className="flex justify-center items-center mt-2">
              <Link href={`/products/${product.id}`} passHref>
                <p className="text-lg sm:text-xl font-bold text-gray-900 hover:text-green-600 cursor-pointer">
                  ${product.price}
                </p>
              </Link>
              <span className="mx-2 text-gray-600">|</span>
              <p className="text-yellow-500 text-lg">{product.rating?.rate} ★</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6" data-aos="fade-up" data-aos-delay="600">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          See All
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default BestSelling;
