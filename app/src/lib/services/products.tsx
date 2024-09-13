import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/app/src/types/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getMenProducts: builder.query<Product[], void>({
      query: () => 'products', 
    }),
  }),
});

export const { useGetMenProductsQuery } = productsApi;
