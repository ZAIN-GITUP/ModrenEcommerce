import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/app/src/types/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    // Query for getting men's products
    getMenProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    
    // Query for getting a product by its ID
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`, // API endpoint to get product by id
    }),
  }),
});

// Export hooks generated by RTK Query
export const { useGetMenProductsQuery, useGetProductByIdQuery } = productsApi;
