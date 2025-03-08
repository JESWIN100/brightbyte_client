import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallCategory`, { withCredentials: true });
        setCategories(response.data.categories);
      } catch (error) {
        alert('Failed to fetch categories');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const { register, handleSubmit, reset, watch } = useForm();
  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  const handleAddCategory = async (data) => {
    if (!data.name || !data.image[0] || !data.description) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]);
    formData.append('description', data.description);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/createcategory`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCategories([...categories, response.data.category]);
      reset();
      setSelectedImage(null);
      showNotification('Category added successfully', 'success');
    } catch (error) {
      showNotification('Failed to add category', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/deleteCategory/${id}`, { withCredentials: true });
      setCategories(categories.filter((item) => item._id !== id));
      showNotification('Category deleted successfully', 'success');
    } catch (error) {
      showNotification('Failed to delete category', 'error');
      console.log(error);
    }
  };

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1">
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
          >
            {notification.message}
          </motion.div>
        )}

        <div className="min-h-screen p-6 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                Category Management
              </motion.h1>
            </div>

            <div className="flex flex-wrap gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md w-full md:w-1/3 border border-purple-100"
              >
                <h2 className="text-xl font-medium mb-4 text-indigo-700">Add New Category</h2>
                <form onSubmit={handleSubmit(handleAddCategory)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                    <input
                      type="text"
                      placeholder="Enter category name"
                      {...register('name')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        {selectedImage ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <img src={selectedImage} alt="Preview" className="h-28 object-contain" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-sm text-gray-500">Click to upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          {...register('image')}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Category description"
                      {...register('description')}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Category
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md w-full md:flex-1 border border-purple-100"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p className="text-xl">No categories found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
                          <th className="p-3 rounded-tl-lg text-left">Category Name</th>
                          <th className="p-3 text-left">Image</th>
                          <th className="p-3 text-left">Description</th>
                          <th className="p-3 rounded-tr-lg text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((item, index) => (
                          <motion.tr
                            key={item?._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="border-b hover:bg-indigo-50 transition-colors"
                          >
                            <td className="p-3 font-medium text-gray-800">{item?.name}</td>
                            <td className="p-3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md"
                              >
                                <img
                                  src={item?.image}
                                  alt={item?.name}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </td>
                            <td className="p-3 text-gray-600 max-w-xs truncate">{item?.description}</td>
                            <td className="p-3 text-center">
                              <motion.button
                                onClick={() => handleDelete(item._id)}
                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 shadow-md transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Delete
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;