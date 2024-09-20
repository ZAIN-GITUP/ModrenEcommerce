import React from 'react';
import { useGetMenProductsQuery } from '@/app/src/lib/services/products';
import { Product } from '@/app/src/types/products'; 
import Image from 'next/image';

const Products: React.FC = () => {
  const { data, error, isLoading } = useGetMenProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

  return (
    <div>
      {data?.map((product: Product) => (
        <div key={product.id}>
          <Image src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating?.rate}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
