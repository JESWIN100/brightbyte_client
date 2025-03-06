import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl" />
        </div>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-8">
            Our Story
          </h1>
        </motion.div>

        {/* Values Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              ),
              color: "bg-gradient-to-br from-blue-500 to-blue-600",
              content: "To provide our customers with the highest quality products while maintaining exceptional service standards and long lasting relationships."
            },
            {
              title: "Our Values",
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: "bg-gradient-to-br from-green-500 to-green-600",
              content: "We believe in transparency, sustainability, and customer satisfaction. Every decision we make is guided by these core principles."
            },
            {
              title: "Our Team",
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              color: "bg-gradient-to-br from-purple-500 to-purple-600",
              content: "Our dedicated team of professionals works tirelessly to ensure your shopping experience exceeds expectations."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-16 w-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">{item.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 bg-white rounded-xl p-12 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
          <div className="max-w-3xl mx-auto relative">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
              Our Journey
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                We are <span className="font-semibold text-blue-600">Veltek Electronic Industries</span>, started in <span className="font-semibold">2015</span> in Kozhikode, Kerala. For years, we have been trusted suppliers of LED lights for homes and streets. Our customers love us because we sell quality products at good prices. We work with the best suppliers to bring you: LED lights, Street lights, Tank filters, and more.
              </p>
              <p>
                In <span className="font-semibold">2025</span>, we started something new - our brand called <span className="font-semibold text-purple-600">Bright Byte</span>. Under this name, we make: Car Wash, Hand Wash, and other cleaning solutions. We are a company that puts our customers first. Whether you need cleaning products, we are here to help. Our products are available in bulk, and we make sure you get the best service every time.
              </p>
              <p className="text-lg font-medium text-center text-gray-900">
                Want to brighten your home or keep things clean? Veltek is here for you!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;