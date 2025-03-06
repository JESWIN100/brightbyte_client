import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    category: '',
    stock: '',
    description: '',
    image1: null,
    image2: null
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getproductbyid/${id}`, { withCredentials: true });
        
        // Convert numerical stock to status string
        const productData = response.data.data;
        const stockStatus = productData.stock > 0 ? 'In Stock' : 'Out of Stock';
        
        setProduct({
          ...productData,
          stock: stockStatus
        });
        console.log(response.data.data);

      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product data');
      }
    };

    fetchProduct();
  }, [id]);

  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const category = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/category/getall`
        );
        console.log(response.data.categories);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load categories');
      }
    };

    category(); // Now it's called inside the useEffect
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert stock status to number before submitting
    const submissionData = {
      ...product,
      stock: product.stock 
    };
    
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/updateProduct/${id}`, submissionData, { withCredentials: true });
      toast.success('Product updated successfully!');
      setTimeout(() => {
        navigate('/admin/products-list');
      }, 1500); // Navigate after showing toast for 1.5 seconds
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleCancel = () => {
    navigate('/admin/products-list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-8"
      >
        <div className="p-6 bg-indigo-600 text-white">
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 " >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                >
                  {categories.map((category) => (
                    <option key={category._id || category.name} value={category.name}> {category.name} </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                <select
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                >
                 <option value="">Select a stock</option>
                  <option value="In stock">In stock</option>
                  <option value="Out of stock">Out of stock</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="col-span-full"
              >
                <label className="block text-sm font-medium  text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={product.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image 1</label>
                <div className="flex items-center justify-center h-48 w-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-300">
                  {product.images && product.images[0] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${product.images[0].replace('\\', '/')}`}
                        alt="Product preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                        type="button"
                      >
                        <XCircle size={20} className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera size={32} className="mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image 2</label>
                <div className="flex items-center justify-center h-48 w-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-300">
                  {product.images && product.images[1] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${product.images[1].replace('\\', '/')}`}
                        alt="Product preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                        type="button"
                      >
                        <XCircle size={20} className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera size={32} className="mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <motion.div
            className="mt-8 flex justify-end space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
            >
              <Save size={18} className="mr-2" /> Save Product
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default EditPage;