"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, updateQuantity, clearCart } from '@/app/src/lib/features/slices/cartslice';
import { FaTrashAlt, FaCartArrowDown } from 'react-icons/fa';
import { RootState, CartItem } from '@/app/src/types/cart'; // Adjust the import path to your types file

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart || []); // Provide default empty array

    const handleRemove = (id: number) => {
        dispatch(remove(id));
    };

    const handleQuantityChange = (id: number, change: number) => {
        dispatch(updateQuantity({ id, change }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold text-center mt-12 mb-4 text-[var(--dark-green)]">Cart</h1>
                
                {/* Cart Table */}
                <div className="w-full max-w-5xl bg-[var(--light-green)] shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto text-left text-gray-600">
                        <thead className="bg-[var(--dark-green)] text-white border-b border-gray-300">
                            <tr>
                                <th className="p-4">Product</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Subtotal</th>
                                <th className="p-4">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems.map((item: CartItem) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-4 flex items-center space-x-4">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                            <span className="font-semibold">{item.title}</span>
                                        </td>
                                        <td className="p-4">${item.price.toFixed(2)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="px-2 py-1 border rounded bg-[var(--light-green)] hover:bg-[var(--hover-green)] text-[var(--dark-green)]"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-center w-8">{item.quantity}</span>
                                                <button
                                                    className="px-2 py-1 border rounded bg-[var(--light-green)] hover:bg-[var(--hover-green)] text-[var(--dark-green)]"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                                        <td className="p-4">
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">Your cart is empty.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cart Totals */}
                <div className="w-full max-w-md bg-[var(--light-green)] shadow-lg rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[var(--dark-green)]">Cart Totals</h2>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-semibold">${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${getTotalPrice()}</span>
                    </div>
                    <button className="w-full bg-[var(--text-green)] text-white py-3 rounded hover:bg-[var(--hover-green)] transition duration-300">
                        Proceed to Checkout
                    </button>
                    <button
                        className="w-full mt-4 bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
                        onClick={handleClearCart}
                    >
                        <FaCartArrowDown /> Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
