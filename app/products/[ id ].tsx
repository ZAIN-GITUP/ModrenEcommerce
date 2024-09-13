import React from "react";
import { useRouter } from "next/router";
import { useGetProductByIdQuery } from "@/app/src/lib/services/products"

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get product ID from the URL

  // Use a query to get product details by ID
  const { data: product, error, isLoading } = useGetProductByIdQuery(id as string);

  if (isLoading) return <p>Loading product...</p>;
  if (error || !product) return <p>Error fetching product details!</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <p className="text-lg text-gray-800 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">${product.price}</p>
          <p className="text-lg text-yellow-500">{product.rating?.rate} ★</p>
          <p className="mt-4">Available stock: {product.rating?.count}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


