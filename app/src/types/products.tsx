export type Product = {
  id: number;
  title: string;
  description: string;
  price: number; // Change this to number
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
};
