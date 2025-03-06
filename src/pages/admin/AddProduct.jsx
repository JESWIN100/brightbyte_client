import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, X, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [categories, setCategories] = useState([]);

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
        toast.error("Failed to load categories", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    };

    category(); // Now it's called inside the useEffect
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: null
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Preview, setImage1Preview] = useState('/api/placeholder/300/200');
  const [image2Preview, setImage2Preview] = useState('/api/placeholder/300/200');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      if (imageNumber === 1) {
        setImage1(file);
        setImage1Preview(URL.createObjectURL(file));
      } else {
        setImage2(file);
        setImage2Preview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (image1) data.append('images', image1);
    if (image2) data.append('images', image2);

    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/products/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        toast.success("Product updated successfully!", {
          position: "bottom-right",
          autoClose: 3000
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/admincreateProduct`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        toast.success("Product added successfully!", {
          position: "bottom-right",
          autoClose: 3000
        });
      }
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/admin/products-list');
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error|| "Failed to submit product. Please try again.", {
        position: "bottom-right",
        autoClose: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (image1Preview && image1Preview.startsWith('blob:')) {
        URL.revokeObjectURL(image1Preview);
      }
      if (image2Preview && image2Preview.startsWith('blob:')) {
        URL.revokeObjectURL(image2Preview);
      }
    };
  }, [image1Preview, image2Preview]);

  const ImageUpload = ({ imageNumber, preview, onChange }) => (
    <div className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-300 hover:border-blue-400 ${activeField === `image${imageNumber}` ? 'border-blue-500 shadow-md bg-blue-50' : 'border-gray-300'}`}
      onMouseEnter={() => setActiveField(`image${imageNumber}`)}
      onMouseLeave={() => setActiveField('')}
    >
      <input type="file" id={`image${imageNumber}`} accept="image/*" onChange={onChange} className="hidden" />
      <label htmlFor={`image${imageNumber}`} className="cursor-pointer flex flex-col items-center">
        <div className="relative w-full h-48 mb-2 overflow-hidden rounded-md bg-gray-100">
          <img src={preview} alt={`Product preview ${imageNumber}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-center">
              <ImageIcon className="mx-auto mb-2" />
              <p>Click to change</p>
            </div>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700"> {`Product Image ${imageNumber}`} </span>
      </label>
    </div>
  );

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className={'ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1'}>
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
          theme="light"
        />
        
        <header className={`bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6 mt-6 transform transition-all duration-500 ${showForm ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <button onClick={() => navigate('/admin/products')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
            </div>
            {formSubmitted && (
              <div className="flex items-center text-green-600 space-x-2 animate-pulse">
                <span className="text-sm md:text-base font-medium">Product saved!</span>
              </div>
            )}
          </div>
        </header>

        {/* Product Form */}
        <div className={`bg-white rounded-lg shadow-lg p-4 md:p-8 transition-all duration-500 
          ${showForm ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
          ${isMobile ? 'mt-6' : 'mt-4'}`}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className={`space-y-2 transition-all duration-300 delay-100 transform ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${activeField === 'name' ? 'scale-103 shadow-sm' : ''}`}
                onMouseEnter={() => setActiveField('name')}
                onMouseLeave={() => setActiveField('')}
              >
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200" placeholder="Enter product name" required />
              </div>

              <div className={`space-y-2 transition-all duration-300 delay-150 transform 
                ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                ${activeField === 'price' ? 'scale-103 shadow-sm' : ''}`}
                onMouseEnter={() => setActiveField('price')}
                onMouseLeave={() => setActiveField('')}
              >
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200" placeholder="0.00" required />
              </div>

              <div className={`space-y-2 transition-all duration-300 delay-200 transform 
                ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                ${activeField === 'category' ? 'scale-103 shadow-sm' : ''}`}
                onMouseEnter={() => setActiveField('category')}
                onMouseLeave={() => setActiveField('')}
              >
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 appearance-none bg-white" required >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}> {category.name} </option>
                  ))}
                </select>
              </div>

              <div className={`space-y-2 transition-all duration-300 delay-250 transform 
                ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                ${activeField === 'stock' ? 'scale-103 shadow-sm' : ''}`}
                onMouseEnter={() => setActiveField('stock')}
                onMouseLeave={() => setActiveField('')}
              >
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <select 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 appearance-none bg-white" 
                  required
                >
                  <option value="">Select a stock</option>
                  <option value="In stock">In stock</option>
                  <option value="Out of stock">Out of stock</option>
                </select>
              </div>
            </div>

            <div className={`mb-4 md:mb-6 space-y-2 transition-all duration-300 delay-300 transform 
              ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              ${activeField === 'description' ? 'scale-103 shadow-sm' : ''}`}
              onMouseEnter={() => setActiveField('description')}
              onMouseLeave={() => setActiveField('')}
            >
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200" rows="4" placeholder="Enter product description" required ></textarea>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 transition-all duration-300 delay-350 transform  ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <ImageUpload imageNumber={1} preview={image1Preview} onChange={(e) => handleImageChange(e, 1)} />
              <ImageUpload imageNumber={2} preview={image2Preview} onChange={(e) => handleImageChange(e, 2)} />
            </div>

            <div className={`flex justify-end gap-3 transition-all duration-300 delay-400 transform 
              ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <button type="button" onClick={() => navigate('/admin/products')} className="px-3 py-2 md:px-4 md:py-2 flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200" >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button type="submit" disabled={isLoading} className={`px-4 py-2 md:px-6 md:py-2 flex items-center space-x-2 bg-blue-600 text-white rounded-lg  hover:bg-blue-700 transition-all duration-200 ${isLoading ? 'opacity-70' : ''}`} >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isEditing ? <Save className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                    <span>{isEditing ? 'Update Product' : 'Add Product'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;