"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { add } from "@/app/src/lib/features/slices/cartslice"; // Adjust path as necessary
import { useGetProductByIdQuery } from "@/app/src/lib/services/products"; // Adjust path if needed
import { CartItem } from "@/app/src/types/cart"; // Adjust path as necessary

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { id } = params; // Get product ID from the URL params
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  // Use a query to get product details by ID
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading product...</p>;
  if (error || !product) return <p>Error fetching product details!</p>;

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity set to 1
    };

    dispatch(add(cartItem)); // Dispatch the add action
    console.log("Product added to cart:", cartItem); // Optional: for debugging
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl  text-[var(--dark-green)] mt-10 font-bold mb-4">{product.title}</h1>

      {/* Using Grid for equal alignment on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg text-[var(--text-green)]  mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">${product.price}</p>
          <p className="text-lg text-yellow-500">{product.rating?.rate} ★</p>
          <p className="mt-4">Available stock: {product.rating?.count}</p>

          {/* Add to Cart Button */}
          <button
            className="mt-6 px-2 py-2 bg-[var(--text-green)] text-white rounded-md hover:bg-green-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
