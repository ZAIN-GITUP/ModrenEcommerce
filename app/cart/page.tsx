import React from 'react';

const Cart = () => {
  return (
    <div className="container  mx-auto px-4 py-8 min-h-screen" data-aos="fade-up">
      <div className="flex flex-col items-center justify-center space-y-4">
    
        <h1 className="text-4xl font-bold text-center mt-12 mb-2">Cart</h1>
        
      
        

        {/* Cart Table */}
        <div className="w-full max-w-5xl bg-gray-50 shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full table-auto text-left text-gray-600">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 flex items-center space-x-4">
                  {/* Image */}
                  <img src="/path/to/plant.jpg" alt="Bird of Paradise Plant" className="w-20 h-20 object-cover rounded-lg" />
                  {/* Title */}
                  <span className="font-semibold">Bird of Paradise Plant</span>
                </td>
                <td className="p-4">$50.00</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 border rounded">-</button>
                    <span className="text-center w-8">5</span>
                    <button className="px-2 py-1 border rounded">+</button>
                  </div>
                </td>
                <td className="p-4">$250.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cart Totals */}
        <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-lg p-6 mt-8" data-aos="fade-left">
          <h2 className="text-2xl font-semibold mb-4">Cart totals</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$250.00</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span>$250.00</span>
          </div>
          <button className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
