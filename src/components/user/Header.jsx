import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/bright_byte-removebg-preview.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect with enhanced threshold and behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Spacer div with dynamic height based on scroll state */}
      <div className={`w-full transition-all duration-500 ${scrolled ? 'h-12' : 'h-12'}`}></div>
      
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          scrolled 
            ? 'bg-white/80 shadow-lg h-16' 
            : 'bg-transparent h-24'
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-full">
            <div className="flex-shrink-0 transition-all duration-300 transform hover:scale-105">
              <Link to="/" className="flex items-center">
                <img 
                  className={`w-auto transition-all duration-500 ${scrolled ? 'h-20' : 'h-20'}`}
                  src={logo} 
                  alt="Logo"
                />
              </Link>
            </div>
            
            {/* Hamburger Menu Button with cooler animation */}
            <button
              type="button"
              className="inline-flex p-2 text-black rounded-md lg:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute h-0.5 rounded-full bg-black transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-6 rotate-45 translate-y-0' : 'w-6 -translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 rounded-full w-6 bg-black transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 rounded-full bg-black transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-6 -rotate-45 translate-y-0' : 'w-6 translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
            
            {/* Desktop Menu - With hover background removed */}
            <div className="hidden lg:flex lg:items-center lg:ml-auto">
              <div className="flex items-center space-x-2">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Our Products', path: '/our-products' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 text-base font-medium transition-all duration-300 ease-in-out group overflow-hidden ${
                      location.pathname === item.path 
                        ? 'text-blue-600' 
                        : scrolled ? 'text-gray-800' : 'text-gray-800'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-all duration-300 ease-in-out ${
                        location.pathname === item.path ? 'opacity-100' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                      }`}
                    ></span>
                    {/* Removed the blue background span that was here */}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu - Enhanced with animations */}
        <div 
          className={`fixed inset-0 z-40 w-full h-full backdrop-blur-xl bg-white/90 transform transition-all duration-500 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
          style={{ top: scrolled ? '64px' : '96px' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Our Products', path: '/our-products' },
              { name: 'Contact', path: '/contact' },
            ].map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-2xl font-medium transition-all duration-300 ease-in-out transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'}`}
                style={{ 
                  transitionDelay: `${isOpen ? index * 0.1 : 0}s`,
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="block mx-auto mt-1 w-8 h-0.5 bg-blue-600"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}