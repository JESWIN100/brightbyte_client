import React, { useEffect, useState } from 'react';
import { User, Upload, Mail, Phone, Save } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      toast.success('Profile image updated successfully!');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/profile`, { withCredentials: true });
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSaveChanges = () => {
    // Simulate API call to save profile
    const success = Math.random() > 0.3; // 70% success rate for demonstration

    if (success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16 md:p-6 md:pt-20">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto bg-white backdrop-blur-sm bg-opacity-80 shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3
              }}
              className="absolute -bottom-16 left-8"
            >
              <motion.div
                whileHover={pulseAnimation}
                className="relative w-32 h-32 bg-white rounded-full p-1 shadow-lg"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <User size={40} />
                  </div>
                )}
                <motion.label
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors duration-200 shadow-md"
                >
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </motion.label>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute right-8 top-8 text-white text-lg font-light"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Admin Dashboard
            </motion.div>
          </motion.div>

          {/* Main content */}
          <div className="pt-20 px-8 pb-8">
            <motion.div
              className="space-y-8"
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-medium text-gray-800 border-b pb-2 border-gray-200"
              >
                Personal Information
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Name"
                      value={profile.username || ''}
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 group-hover:border-blue-300"
                    />
                    <User className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={16} />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="email"
                      value={profile.email || ''}
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 group-hover:border-blue-300"
                      disabled
                    />
                    <Mail className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={16} />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative group">
                    <input
                      type="tel"
                      placeholder="+91-9633799929"
                      disabled
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 group-hover:border-blue-300"
                    />
                    <Phone className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={16} />
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex justify-end mt-8"
              >
                {/* <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveChanges}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </motion.button> */}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Toast container for notifications */}
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
    </div>
  );
};

export default ProfilePage;