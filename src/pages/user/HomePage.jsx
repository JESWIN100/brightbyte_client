import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ArrowLeft, Star, CheckCircle, Sun } from 'lucide-react';
import image from '../../assets/All products.jpg';
import CategorySection from './Category';
import { Image } from 'antd';
import axios from 'axios';

// Background particles component
const ParticleBackground = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-purple-300/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse"
          }}
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  );
};

const LatestProductSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/getallProduct`);
        const latestProducts = response.data.data.slice(-4); // Get the last 4 products
        setCategories(latestProducts);
        console.log("Latest products:", latestProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 opacity-80" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Products</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.reverse().map(product => (
            <div key={product._id} className="overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition duration-500">
              <Image
                width="100%"
                height="100"
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-200">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const LatestProductCard = ({ LatestProduct, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={LatestProduct.name}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="flex-none w-64 perspective-500"
      style={{ scrollSnapAlign: 'start' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden h-80 transform-style-3d"
        animate={{ rotateY: isHovered ? 5 : 0, z: isHovered ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Shine effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 400, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>

        {/* Image container */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={LatestProduct.image}
              alt={LatestProduct.name}
              className="w-full"
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
                >
                  <div className="bg-purple-500/80 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 relative">
          <motion.div
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {LatestProduct.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {LatestProduct.desc}
            </p>

            {/* Button appears on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 inline-flex items-center text-sm text-purple-600 font-medium"
                >
                  <a href="">Explore</a> <ArrowRight className="ml-1 w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute rotate-45 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[135px] text-center">
            New
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <>
      {/* Hero Section - Added m-0 and p-0 to remove unwanted gaps */}
      <div className="relative min-h-screen w-full overflow-hidden m-0 p-0">
        {/* Background image with animated overlay */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`
            }}
          />

          {/* Interactive gradient overlays */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent"
            animate={{
              opacity: [0.8, 0.9, 0.8]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/90" />
        </motion.div>

        {/* Animated particles */}
        <ParticleBackground />

        {/* Main Content - Adjusted to make sure there's no extra padding */}
        <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 m-0 pt-0">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm border border-purple-200 mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </motion.div>
                <span className="text-gray-900 font-medium">Welcome to the Future</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Create the Future
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-2"
                >
                  Together
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-xl text-gray-600 mb-10 max-w-lg"
              >
                Embark on a journey of cleanliness and freshness. Transform your space with our advanced cleaning solutions, designed to make your home shine effortlessly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all duration-200 shadow-lg shadow-purple-200 hover:shadow-xl group"
                >
                  <a href="/our-products">Explore with us</a>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl border-2 border-purple-200 text-gray-900 hover:bg-purple-50 backdrop-blur-sm transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <a href="/about">Learn More</a>
                </motion.button>
              </motion.div>

              {/* Feature list with animated icons */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <FeatureItem
                  icon={Sparkles}
                  title="Freshness"
                  description="Crisp, invigorating scents that leave spaces smelling clean"
                  index={0}
                />

                <FeatureItem
                  icon={Sun}
                  title="Shine"
                  description="Superior formulas that provide brilliant, streak-free results"
                  index={1}
                />
              </div>
            </motion.div>

            {/* Right Column - Interactive Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative lg:block hidden"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Floating elements */}
                <motion.div
                  className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ top: '10%', left: '10%' }}
                />

                <motion.div
                  className="absolute z-10 w-80 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-purple-200"
                  initial={{ rotate: -5 }}
                  animate={{
                    rotate: [-5, 5, -5],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ top: '5%', right: '5%' }}
                >
                  <img
                    src="/src/assets/img2.jpg"
                    alt="Cleaning products showcase"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute z-20 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-purple-200 p-6"
                  initial={{ rotate: 5 }}
                  animate={{
                    rotate: [5, -5, 5],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                  style={{ bottom: '5%', left: '5%' }}
                >
                  <motion.div
                    className="absolute z-20 w-64 h-64 rounded-2xl overflow-hidden"
                    initial={{ rotate: 5 }}
                    animate={{
                      rotate: [5, -5, 5],
                      y: [0, 10, 0]
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1
                    }}
                    style={{ bottom: '5%', left: '5%' }}
                  >
                    <img
                      src="/src/assets/img1.jpg"
                      alt="Premium cleaning quality showcase"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>

                {/* Small floating elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute z-30 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 10, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.5
                    }}
                    style={{
                      top: `${20 + i * 30}%`,
                      left: `${60 - i * 15}%`,
                    }}
                  >
                    <img
                      src="/src/assets/bright_byte-removebg-preview.png"
                      alt={`Product icon ${i}`}
                      className="w-20 h-15 rounded-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <CategorySection />

       {/* Latest Section */}
       <LatestProductSection />

    </>
  );
};

export default HomePage;