import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallCategory`, { withCredentials: true });
        setCategories(response.data.categories);
      } catch (error) {
        alert('Failed to fetch categories');
        console.log(error);
        
      }
    };
    fetchCategories();
  }, []);

  const { register, handleSubmit, reset } = useForm();

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
      alert('Category added successfully');
    } catch (error) {
      alert('Failed to add category');
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/deleteCategory/${id}`, { withCredentials: true });
      setCategories(categories.filter((item) => item._id !== id));
      alert('Category deleted successfully');
    } catch (error) {
      alert('Failed to delete category');
      console.log(error);
      
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1">
        <div className="min-h-screen bg-gray-100 p-6 font-roboto">
          <div className="p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Category</h1>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-6 rounded-md shadow-md w-full md:w-1/3">
                <h2 className="text-lg font-medium mb-4">Add New Category</h2>
                <form onSubmit={handleSubmit(handleAddCategory)}>
                  <input
                    type="text"
                    placeholder="Main Category Name"
                    {...register('name')}
                    className="mb-4 w-full p-2 border rounded"
                  />
                  <input
                    type="file"
                    {...register('image')}
                    className="mb-4 w-full"
                  />
                  <textarea
                    placeholder="Description"
                    {...register('description')}
                    rows={4}
                    className="mt-4 w-full p-2 border rounded"
                  />
                  <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Add Category
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-md shadow-md w-full md:flex-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Category Name</th>
                      <th className="border p-2">Image</th>
                      <th className="border p-2">Description</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item) => (
                      <tr key={item?.key}>
                        <td className="border p-2">{item?.name}</td>
                        <td className="border p-2">
                        <img 
  src={item?.image}
  alt="category" 
  className="w-12 h-12 rounded-md object-cover" 
/>

                        </td>
                        <td className="border p-2">{item?.description}</td>
                        <td className="border p-2">
                          <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2 rounded">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;