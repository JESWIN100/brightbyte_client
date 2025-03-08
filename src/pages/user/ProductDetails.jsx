import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getproductbyid/${id}`);
        setProduct(response.data.data);
        setMainImage(response.data.data.images[0]);

        const similarResponse = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        setSimilarProducts(similarResponse.data.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setSelectedThumbnail(index);
  };

  if (!product) return <div>Loading...</div>;





 const ProductDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortDescription = description.length > 100 ? description.slice(0, 20) + '...' : description;

    return (
      <span className="text-xs md:text-sm text-gray-500">
        {isExpanded ? description : shortDescription}
        {description.length > 100 && (
          <button
            className="text-blue-500 ml-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </span>
    );
  };





  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12">
      <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
        <div className="flex flex-col items-center justify-center p-6 w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={`${mainImage}`}
              alt={product.name}
              className="max-w-full h-96 rounded-xl object-cover"
            />
          </div>
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  selectedThumbnail === index ? "border-2 border-gray-800" : "border-2 border-transparent"
                }`}
                onClick={() => handleThumbnailClick(img, index)}
              />
            ))}
          </div>
        </div>
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <span className="text-black text-xs uppercase px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold mt-4 text-gray-900">{product.name}</h1>
          <h2>About</h2>
          <div className="">
  <p className="text-gray-600 mt-4">
    {product.description.length > 100
      ? product.description.match(/.{1,100}/g).map((chunk, index) => (
          <span key={index}>{chunk}<br/></span>
        ))
      : product.description}
  </p>
</div>


          <div className="mt-6">
            <div className="text-2xl font-bold text-gray-900">Price: ₹{product.price}</div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-12 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.reverse().map((similar) => (
            <div key={similar._id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={similar.images[0]}
                alt={similar.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{similar.name}</h3>
              <p className="text-gray-600 mt-2">₹{similar.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;