import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Circular Category component
const CircularCategory = ({ category, index }) => {
    const [isHovered, setIsHovered] = React.useState(false);
console.log("sds",category);
const navigate = useNavigate();

const handleProductClick = (name) => {
    navigate(`/products/${name}`);
  };


    return (
        <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex-none w-52 mx-2"
            style={{ scrollSnapAlign: 'center' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center">
                <motion.div
                    className="relative w-44 h-44 rounded-full shadow-lg overflow-hidden transform-style-3d"
                    animate={{ rotateY: isHovered ? 5 : 0, z: isHovered ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {/* Shine effect on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent z-10"
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 200, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Image container */}
                    <motion.div
                        className="w-full h-full relative"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                           src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Floating icon on hover */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                    onClick={() => handleProductClick(category.name)}
                                >
                                    <div className="bg-purple-500/80 p-3 rounded-full">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Category Name */}
                <motion.div
                    animate={{ y: isHovered ? -5 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-center"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {category.name}
                    </h3>

                    {/* Button appears on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* <button
                                    className="inline-flex items-center text-sm text-purple-600 font-medium"
                                >
                                    Explore <ArrowRight className="ml-1 w-4 h-4" />
                                </button> */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};



const CategorySection = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/category/getall`);
                const data = response.data.categories
                ;
console.log("fdfdf",data);

                // Check if data is an array
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);



    
    const scrollContainer = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainer.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 opacity-80" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Categories</span>
                </h2>
                <div className="relative">
                    <motion.button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5 text-purple-600" />
                    </motion.button>
                    <motion.button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg"
                    >
                        <ArrowRight className="w-5 h-5 text-purple-600" />
                    </motion.button>
                    <div
                        ref={scrollContainer}
                        className="flex overflow-x-auto py-6 no-scrollbar scroll-smooth"
                        style={{
                            scrollSnapType: 'x mandatory',
                            paddingLeft: '10%',
                            paddingRight: '10%'
                        }}
                    >
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <CircularCategory key={category.name} category={category} index={index} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No categories found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;



