import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        setProducts(response.data.data);
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
        <Row gutter={[24, 24]} justify="center">
          {products.map((product, index) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <Card
                  hoverable
                  cover={
                    <motion.img
                      alt={product.name}
                      src={product.images[0]}
                      className="h-90 m-1 p-6 object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                  }
                >
                  <Meta
                    title={product.name}
                    description={
                      <div>
                        <p className="text-gray-700 line-clamp-2">{product.description}</p>
                        <motion.div
                          className="flex justify-between items-center mt-4"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-xl font-bold">₹{product.price}</span>
                          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                        </motion.div>
                      </div>
                    }
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  );
};

export default ProductsPage;