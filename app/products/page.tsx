"use client";
import React, { useEffect, useState } from "react";
import { useGetProductsByCategoryQuery } from "@/app/src/lib/services/products";
import { Product } from "@/app/src/types/products";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { add } from "@/app/src/lib/features/slices/cartslice";
import { CartItem } from "@/app/src/types/cart";
import Image from "next/image";
type State = {
  selectedCategory: string;
  searchTerm: string;
  products: Product[];
  isLoading: boolean;
  error: FetchBaseQueryError | null;
};

const SeeAll: React.FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    selectedCategory: "",
    searchTerm: "",
    products: [],
    isLoading: true,
    error: null,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Set to 6 for 6 cards per page
  const { selectedCategory, searchTerm, products, isLoading, error } = state;

  // Fetch products based on the selected category
  const {
    data: fetchedProducts,
    error: fetchError,
    isLoading: fetching,
  } = useGetProductsByCategoryQuery(selectedCategory || "");

  useEffect(() => {
    if (fetching) {
      setState((prev) => ({ ...prev, isLoading: true }));
    } else if (fetchError) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: fetchError as FetchBaseQueryError,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        products: fetchedProducts || [],
        error: null,
      }));
    }
  }, [fetching, fetchError, fetchedProducts, selectedCategory]); // Make sure selectedCategory is in the dependency array

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAdd = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1, // Ensure quantity is initialized
    };

    console.log("Adding to cart:", cartItem);
    dispatch(add(cartItem));
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

  return (
    <section className="px-4 py-8 sm:py-16 bg-[var(--light-green)] min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Category Buttons */}
        <div className="categoryButtons flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() =>
              setState((prev) => ({ ...prev, selectedCategory: "" }))
            }
            className={`bg-cyan-400 text-cyan-600 px-4 py-2 rounded ${
              selectedCategory === "" ? "bg-blue-700" : ""
            }`}
          >
            All
          </button>
          {[
  "men&rsquo;s clothing",
  "women&rsquo;s clothing",
  "electronics",
  "jewelery",
].map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setState((prev) => ({ ...prev, selectedCategory: cat }))
              }
              className={`bg-cyan-400 text-cyan-600 px-4 py-2 rounded ${
                selectedCategory === cat ? "bg-blue-700" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products"
          className="border border-gray-300 rounded px-4 py-2 mb-6"
          value={searchTerm}
          onChange={(e) =>
            setState((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
        />

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="relative text-center bg-white rounded-lg shadow-lg p-6 group"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={500} 
                height={500}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <div className="flex justify-center items-center mt-2">
                <p className="text-lg font-bold text-gray-900">
                  ${product.price}
                </p>
                <span className="mx-2 text-gray-600">|</span>
                <p className="text-yellow-500 text-lg">
                  {product.rating?.rate} ★
                </p>
              </div>
              {/* Hover icons for Add to Cart and View Product */}
              <div className="absolute flex flex-col top-2 right-2 p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-[var(--light-green)] text-[var(--text-green)] font-extrabold p-2 rounded-full"
                  onClick={() => handleAdd(product)}
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                <Link href={`/products/${product.id}`}>
                  <div className="bg-[var(--light-green)] text-[var(--text-green)] font-extrabold p-2 rounded-full">
                    <EyeIcon className="h-5 w-5" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination custom:grid-cols-2 sx:grid-cols-7 md:grid-cols-7 sm:grid-cols-3 mt-4 justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btns px-4 py-2 border m-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-cyan-400 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SeeAll;
