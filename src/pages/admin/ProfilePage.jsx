import React, { useEffect, useState } from 'react';
import { User, Upload, Mail, Phone } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const[profile,setProfile]=useState([])
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      toast.success('Profile image updated successfully!');
    }
  };


useEffect(()=>{

const fetchUserProfile=async()=>{
  
const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/profile`,{withCredentials:true})
setProfile(response.data)
console.log(response.data);

}
fetchUserProfile()
},[])



  const handleSaveChanges = () => {
    // Simulate API call to save profile
    const success = Math.random() > 0.3; // 70% success rate for demonstration
    
    if (success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-16 md:p-0 md:pt-14">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative w-32 h-32 bg-white rounded-full p-1 shadow-md">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User size={40} />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors duration-200 shadow-md">
                <Upload size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-20 px-8 pb-8">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-800">Admin Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder='Name'
                    value={profile.username}
                    className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder='email'
                    value={profile.email}
                    className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder='+91-9633799929'

                    disabled
                  
                    className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>
            
            {/* <div className="pt-4">
              <button 
                onClick={handleSaveChanges}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div> */}
          </div>
        </div>
      </div>

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