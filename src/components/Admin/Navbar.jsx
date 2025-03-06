import React, { useState, useEffect } from 'react';
import { Home, User, ShoppingBag, BarChart2, FileText, Menu, X, PlusCircle, icons, Layers, ScrollText, ListOrdered, ChartBarStacked } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
;

  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }

      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/admin/dashboard' },
    { id: 'products', label: 'Products', icon: <ShoppingBag size={20} />, path: '/admin/products-list' },
    { id: 'add products', label: 'Add Products', icon: <PlusCircle size={20} />, path: '/admin/add-product' },
    {id:'checkStock',label:'Stock',icon:<Layers icon={20}/>,path:"/admin/stock"},
    {id:'invoice',label:'Invoice',icon:<ScrollText  size={20}/>,path:'/admin/invoice'},
    {id:'invoucelist',label:'Invoice List',icon:<ListOrdered size={20} />,path:"/admin/invoice/list"},
    {id:'category',label:'Category',icon:<ChartBarStacked size={20} />,path:"/admin/category"},
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeMenuItem = menuItems.find(item => currentPath === item.path);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.id);
    }
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path;
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Logging out...");
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/logout`,
        {},
        { withCredentials: true }
      );
  
      if (response.data.success) {
        // Update the loading toast to success
        toast.update(loadingToastId, {
          render: response.data.message || "Logged out successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
        
        // Redirect after toast is shown
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.error || error.message);
      // Show error toast
      toast.error(error.response?.data?.error || 'Failed to log out', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };
  
  const handleNavigate=()=>{
    navigate('/admin/my-profile')
  }
  



  // Mobile menu component
  const MobileMenu = () => (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      onClick={() => setMobileMenuOpen(false)}>
      <div
        className="bg-white h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out"
        style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    handleNavigation(item.path);
                  }}
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${activeItem === item.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  aria-label={item.label}
                  aria-current={activeItem === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-bold text-black">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-black">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );




  return (
    <>
      {/* Toast Container */}
      <ToastContainer position="bottom-right" />
      
      {/* Mobile menu toggle button - improved positioning and visibility */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu - always render but conditionally show for smoother transitions */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`bg-white h-full w-64 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      handleNavigation(item.path);
                    }}
                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${activeItem === item.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                      }`}
                    aria-label={item.label}
                    aria-current={activeItem === item.id ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="ml-3 font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">AD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-black">admin@example.com</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - improved responsiveness with tailwind classes */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white text-black transition-all duration-300 ease-in-out shadow-md z-30
          hidden md:block ${collapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <h1
              className="text-xl font-bold overflow-hidden transition-opacity duration-300"
              style={{ opacity: collapsed ? 0 : 1 }}
            >
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu
              size={20}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    handleNavigation(item.path);
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ease-in-out ${activeItem === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : hoveredItem === item.id
                      ? 'bg-gray-100'
                      : 'bg-transparent hover:bg-gray-50'
                    } ${collapsed ? 'justify-center' : 'justify-start'}`}
                  aria-label={item.label}
                  aria-current={activeItem === item.id ? 'page' : undefined}
                  title={collapsed ? item.label : ''}
                >
                  <span className={`flex-shrink-0 transition-transform duration-200 ${hoveredItem === item.id ? 'scale-110' : 'scale-100'
                    }`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3 font-medium overflow-hidden whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-2 border-t border-gray-200 bg-white">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer">
                <span className="text-sm font-bold text-gray-600">AD</span>
              </div>
              {!collapsed && (
                <div className="ml-2 transition-opacity duration-300 cursor-pointer" onClick={handleNavigate}> 
                  <p className="text-sm font-medium">Saju P</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button 
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`md:pl-20 lg:pl-64 transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}></div>
    </>
  );
};

export default Navbar;