import React from 'react';
import { Home } from 'lucide-react';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Animation - 1740653989734.json'; 

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* Lottie Animation */}
        <div className="w-64 mx-auto">
          <Lottie animationData={errorAnimation} loop={true} />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-gray-900">404</h1>
        
        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Page not found</h2>
          <p className="text-gray-600">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Return Home Button */}
        <button 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={() => window.location.href = '/'}
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </button>
        
        {/* Help Text */}
        <p className="text-sm text-gray-500">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
