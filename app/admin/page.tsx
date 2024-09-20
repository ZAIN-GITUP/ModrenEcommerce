"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // New field for category
}

const AdminForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "", // Initialize category
  });

  // Generate unique ID
  const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Check if the field is price and ensure it's not less than 0
    if (name === "price") {
      const price = parseFloat(value);
      setProduct({
        ...product,
        [name]: price >= 0 ? price : 0, // Ensure price is not negative
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { ...product, id: generateId() };

    // Submit product data
    console.log("Product submitted: ", newProduct);

    // Reset form
    setProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "", 
    });
  };

  return (
    <div className="min-h-screen bg-[var(--light-green)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-6 sm:mt-20 p-6 mb-6 bg-[var(--hover-green)] rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--dark-green)]">
          Add New Product
        </h1>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-[var(--dark-green)]">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-[var(--dark-green)]">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-[var(--dark-green)]">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
            min="0" // Ensure the user cannot enter a negative price
          />
        </div>

        {/* Category */}
        <div className="mb-4">
  <label className="block text-sm font-semibold mb-2 text-[var(--dark-green)]">
{/* eslint-disable-line react/no-unescaped-entities */}
    Category
  </label>
  <select
    name="category"
    value={product.category}
    onChange={handleInputChange}
    required
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
  >
    <option value="">Select Category</option>
    <option value="Men&#39;s Clothing">Men&#39;s Clothing</option>
    <option value="Women&#39;s Clothing">Women&#39;s Clothing</option>
    <option value="Accessories">Accessories</option>
    <option value="Electronics">Electronics</option>
  </select>
</div>



        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-[var(--dark-green)]">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {product.image && (
            <Image
              src={product.image}
              alt="Preview"
              width={500} 
              height={500}
              className="mt-4 w-32 h-32 object-cover text-[var(--dark-green)]"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[var(--light-green)] text-[var(--dark-green)] font-semibold rounded-lg transition-colors hover:bg-hover-green"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
