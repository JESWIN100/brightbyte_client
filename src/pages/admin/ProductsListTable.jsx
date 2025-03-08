import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  // Sample data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallProduct`,
          { withCredentials: true }
        );
        setProducts(response.data.data); // Assuming the products are in response.data.data
        console.log("products", response.data.data);

      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/deleteProduct/${id}`, { withCredentials: true });

      // Show success toast notification
      toast.success('Product deleted successfully!');

      // Update the state to remove the deleted product
      setProducts((prevProducts) => prevProducts.reverse().filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
      // Show error toast notification
      toast.error('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-16">
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
        />

        {/* Products List - Modernized */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <h2 className="p-4 md:p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-semibold text-white">
            Products List
          </h2>
          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10">
                <img
                  src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg"
                  alt="No products available"
                  className="h-32 w-32 mb-4"
                />
                <p className="text-lg text-gray-500">Oh no! No products available right now.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.reverse().map((product, index) => (
                    <tr
                      key={product.id || product._id}
                      className="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationDuration: '0.5s',
                        animationFillMode: 'both',
                        animationName: 'fadeIn'
                      }}
                    >
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm md:text-base">{product.name}</span>
                          <div className="">
  <p className="text-gray-600 mt-4">
    {product.description.length > 100
      ? product.description.match(/.{1,300}/g).map((chunk, index) => (
          <span key={index}>{chunk}<br/></span>
        ))
      : product.description}
  </p>
</div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span className="px-2 md:px-3 py-1 inline-flex text-xs md:text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="flex space-x-0 md:space-x-2">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-110"
                          />
                          <img
                            src={product.images && product.images[1]
                              ? product.images[1]
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
                            }
                            alt={product.name}
                            className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-medium">
                        <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span className={`px-2 md:px-3 py-1 inline-flex text-xs md:text-sm font-medium rounded-full ${product.stock === 'Out of stock' ? 'bg-red-100 text-red-800' :
                            product.stock === 'In stock' ? 'bg-green-100 text-green-800' :
                              product.stock === 'Limited stock' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                          }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-right text-sm font-medium">
                        <button className="bg-indigo-100 text-indigo-600 p-1 md:p-2 rounded-lg hover:bg-indigo-200 transition-colors mr-1 md:mr-2">
                          <a href={`/admin/edit-product/${product._id}`}><Edit size={16} /></a>
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="bg-red-100 text-red-600 p-1 md:p-2 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          table {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;