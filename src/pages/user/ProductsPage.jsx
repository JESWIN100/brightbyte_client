import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card } from "flowbite-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.12)"
              }}
              className="transform transition-all duration-300 ease-in-out w-full max-w-xs cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <Card
                imgSrc={product.images[0]}
                imgAlt={product.name}
                className="w-full"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {product.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-black">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    {product.stock}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsPage;