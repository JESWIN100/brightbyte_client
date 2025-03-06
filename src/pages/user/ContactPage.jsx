import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const onSubmit = async (data) => {
    if(!data.length===0){
     return alert("data")
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/contact/createcontact`, data);
      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          reset();
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91-9633799929, <br /> +91-8111909929</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">veltekindustries@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Medakkunnu Malayil, Moottoli</p>
                    <p className="text-gray-600">Kakkodi, Kozhikode, Kerala 673611</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Why Choose Us?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>99.9% Customer Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Fast Response Time</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {['name', 'email', 'subject', 'message'].map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    {...register(field)}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused('')}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className={`w-full px-4 py-3 bg-white text-black rounded-lg border ${
                      focused === field
                        ? 'border-blue-500 ring-2 ring-blue-100'
                        : 'border-gray-200'
                    } focus:outline-none transition-all duration-300 ${
                      field === 'message' ? 'h-32' : ''
                    }`}
                    style={{
                      transform: focused === field ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg
                          hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 
                          transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>

            {submitted && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg
                            animate-fade-in-up flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Message sent successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
