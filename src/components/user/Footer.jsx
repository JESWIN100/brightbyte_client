import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../../assets/bright_byte-removebg-preview.png';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/our-products' },
    { name: 'Contact', path: '/contact' }
  ];

  const Help = [
    { name: 'Terms & Conditions', path: '/terms&conditions' },
    { name: 'Customer Support', path: '/customer-support' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, path: 'https://twitter.com/yourcompany' },
    { name: 'Facebook', icon: Facebook, path: 'https://facebook.com/yourcompany' },
    { name: 'Instagram', icon: Instagram, path: 'https://instagram.com/yourcompany' },
    { name: 'LinkedIn', icon: Linkedin, path: 'https://linkedin.com/company/yourcompany' }
  ];

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4 group">
            <Link to="/" className="block">
              <img
                src={logo}
                alt="Company Logo"
                className="h-20 w-30 transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110"
              />
            </Link>
            <p className="text-gray-600 text-sm opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:text-blue-600">
              Making the world a better place through innovative solutions.
            </p>
          </div>

          {/* Quick Links - Removed hover line */}
          <div className="transform hover:-translate-y-2 transition-all duration-500">
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="overflow-hidden" style={{ transitionDelay: `${index * 50}ms` }}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300 block transform hover:translate-x-2 hover:font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help - Removed hover line */}
          <div className="transform hover:-translate-y-2 transition-all duration-500">
            <h3 className="font-semibold text-gray-900 mb-4">
              Help
            </h3>
            <ul className="space-y-2">
              {Help.map((service, index) => (
                <li key={service.name} className="overflow-hidden" style={{ transitionDelay: `${index * 50}ms` }}>
                  <Link
                    to={service.path}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300 block transform hover:translate-x-2 hover:font-medium"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Removed hover line */}
          <div className="transform hover:-translate-y-2 transition-all duration-500">
            <h3 className="font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-600">
              <Link to="/contact" className="block hover:text-blue-600 transition-all duration-300 transform hover:translate-x-1 group">
                <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">📍</span> Puthukkudi Medakkunnu Malayil <br /> 
                <span className='mx-7'>Moottoli, Kakkodi, Kerala,</span> <br /> 
                <span className='mx-7'>Kozhikode 673611</span>
              </Link>
              <a href="tel:+15551234567" className="block hover:text-blue-600 transition-all duration-300 transform hover:translate-x-1 group">
                <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">📞</span> +91-9633799929 <br /> 
                <span className='mx-7'>+91-8111909929</span>
              </a>
              <a href="mailto:info@company.com" className="block hover:text-blue-600 transition-all duration-300 transform hover:translate-x-1 group">
                <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">✉️</span> veltekindustries@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300 transform hover:translate-x-1">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transform hover:scale-125 hover:rotate-12 transition-all duration-300"
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <social.icon size={24} className="transform transition-all duration-500 hover:drop-shadow-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;