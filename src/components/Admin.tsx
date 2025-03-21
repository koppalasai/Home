import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  // Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (productName.trim() && productPrice > 0) {
      const newProduct: Product = {
        id: new Date().getTime(),
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage
      };

      // Update local state
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Store in localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Reset form fields
      setProductName('');
      setProductPrice(0);
      setProductDescription('');
      setProductImage('');
      setImagePreview('');
    }
  };

  const handleDeleteProduct = (productId: number) => {
    // Filter out the product to delete
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);

    // Update localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Page</h1>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Product Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Product Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Product
          </button>
        </form>

        {/* Product List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product List</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-50"
              >
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600">Price: ₹{product.price}</p>
                  <p className="text-gray-600">{product.description}</p>
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mt-2" />
                  )}
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {products.length === 0 && <p className="text-center text-gray-500">No products added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
