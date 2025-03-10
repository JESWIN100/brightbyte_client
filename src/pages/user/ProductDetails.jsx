import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getproductbyid/${id}`);
        setProduct(response.data.data);
        setMainImage(response.data.data.images[0]);

        const similarResponse = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        setSimilarProducts(similarResponse.data.data.slice(0, 4));
        
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
    
    // Reset image load state when product changes
    return () => {
      setImageLoaded(false);
    };
  }, [id]);

  const handleThumbnailClick = (img, index) => {
    setImageLoaded(false);
    setMainImage(img);
    setSelectedThumbnail(index);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const ProductDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

    return (
      <div className="mt-4 transition-all duration-500 ease-in-out">
        <p className="text-gray-600">
          {isExpanded ? description : shortDescription}
          {description.length > 100 && (
            <button
              className="text-blue-500 ml-2 hover:text-blue-700 transition-colors duration-300 font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
      </div>
    );
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl text-gray-600">Product not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 transition-all duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col md:flex-row">
          <div className="flex flex-col items-center justify-center p-6 w-full md:w-1/2 transition-all duration-500 ease-in-out">
            <div className="relative overflow-hidden rounded-xl bg-gray-100 w-full h-96 flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse w-full h-full bg-gray-200"></div>
                </div>
              )}
              <img
                src={`${mainImage}`}
                alt={product.name}
                className={`max-w-full h-96 rounded-xl object-cover transition-opacity duration-500 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
              />
            </div>
            <div className="flex mt-6 space-x-3 overflow-x-auto py-2 w-full justify-center">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer group transform transition-all duration-300 hover:scale-105 ${
                    selectedThumbnail === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                    onClick={() => handleThumbnailClick(img, index)}
                  />
                  {selectedThumbnail === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 w-full md:w-1/2 flex flex-col justify-center bg-white transition-all duration-500 ease-in-out">
            <div className="animate-fade-in-up">
              <span className="bg-blue-50 text-blue-700 text-xs font-medium uppercase px-3 py-1 rounded-full inline-block">
                {product.category}
              </span>
              
              <h1 className="text-4xl font-extrabold mt-4 text-gray-900 transition-all duration-500">{product.name}</h1>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">About This Product</h2>
                <ProductDescription description={product.description} />
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="text-3xl font-bold text-gray-900">₹{product.price}</div>
                <div className="ml-4 bg-green-50 text-green-700 px-2 py-1 rounded text-sm">In Stock</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 relative inline-block">
            Similar Products
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform translate-y-1"></div>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.reverse().map((similar, index) => (
              <div 
                key={similar._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={similar.images[0]}
                    alt={similar.name}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{similar.name}</h3>
                  <p className="text-blue-600 font-bold mt-2">₹{similar.price}</p>
                  <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded transition-colors duration-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;