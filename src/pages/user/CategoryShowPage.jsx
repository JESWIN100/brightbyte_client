import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoryShowPage() {
  const [products, setProducts] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1//product/getallProduct`);
        console.log('Fetched data:', response.data);
        const filteredProducts = response.data.data.filter(product => {
          console.log('Comparing:', product.category, name);
          return product.category === name;
        });
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [name]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gray-50 p-4">
      {products.map((card) => (
        <div 
          key={card._id} 
          className="card bg-base-100 w-80 shadow-xl cursor-pointer"
          onClick={() => handleProductClick(card._id)}
        >
          <figure>
            <img
              src={card.images[0]}
              alt={card.name}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body bg-gray-50 text-black">
            <h2 className="card-title">
              {card.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{card.description}</p>
            <p className="text-lg font-semibold">₹{card.price}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{card.category}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}