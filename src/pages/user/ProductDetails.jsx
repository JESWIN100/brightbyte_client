import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getproductbyid/${id}`);
        setProduct(response.data.data);
        setMainImage(response.data.data.images[0]);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
        <div className="bg-gray-100 flex flex-col items-center justify-center p-6 w-full md:w-1/2">
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
          <span className="bg-gray-800 text-white text-xs uppercase px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold mt-4 text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-6">
            <div className="text-2xl font-bold text-gray-900">Price: ₹{product.price}</div>
            <div className="text-lg text-gray-700 mt-2">Availability: {product.stock} products in stock</div>
          </div>
          <button className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;