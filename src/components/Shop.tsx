import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string; // Added a property for the image URL
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          Welcome to the Shop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
              
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-white">
                <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-700 mb-4 text-justify">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-700">
                    ₹{product.price}
                  </span>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:shadow-md transform hover:scale-105 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-700 mt-12 font-semibold">
            No products available. Please check back later!
          </p>
        )}
      </div>
    </div>
  );
};

export default Shop;
