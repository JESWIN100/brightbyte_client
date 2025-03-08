import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, Menu, X, Layers, ScrollText, ChartBarStacked, ChevronDown, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/admin/dashboard' },
    {
      id: 'products',
      label: 'Products',
      icon: <ShoppingBag size={20} />,
      hasSubmenu: true,
      submenu: [
        { id: 'products-list', label: 'Products List', path: '/admin/products-list' },
        { id: 'add-products', label: 'Add Products', path: '/admin/add-product' }
      ]
    },
    { id: 'checkStock', label: 'Stock', icon: <Layers size={20} />, path: "/admin/stock" },
    {
      id: 'invoice',
      label: 'Invoice',
      icon: <ScrollText size={20} />,
      hasSubmenu: true,
      submenu: [
        { id: 'create-invoice', label: 'Create Invoice', path: '/admin/invoice' },
        { id: 'invoice-list', label: 'Invoice List', path: '/admin/invoice/list' }
      ]
    },
    { id: 'category', label: 'Category', icon: <ChartBarStacked size={20} />, path: "/admin/category" },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Check main menu items
    const activeMenuItem = menuItems.find(item => currentPath === item.path);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.id);
      return;
    }

    // Check submenu items
    for (const item of menuItems) {
      if (item.hasSubmenu) {
        const activeSubmenuItem = item.submenu.find(subItem => currentPath === subItem.path);
        if (activeSubmenuItem) {
          setActiveItem(activeSubmenuItem.id);
          // Expand the parent menu that contains the active submenu item
          setExpandedMenus(prev => ({ ...prev, [item.id]: true }));
          return;
        }
      }
    }
  }, []);

  const handleNavigation = (path) => {
    // Add a subtle loading effect before navigation
    document.body.classList.add('page-transition');
    setTimeout(() => {
      window.location.href = path;
      // Close mobile menu when navigating
      setMobileMenuOpen(false);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      const loadingToastId = toast.loading("Logging out...", {
        position: "top-center",
        className: "logout-toast"
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.update(loadingToastId, {
          render: response.data.message || "Logged out successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          className: "logout-toast-success",
          progressClassName: "logout-progress"
        });

        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 1500);
      }
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || 'Failed to log out', {
        position: "top-right",
        autoClose: 3000,
        className: "error-toast"
      });
    }
  };

  const handleNavigate = () => {
    navigate('/admin/my-profile');
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const renderMenuItem = (item) => {
    if (item.hasSubmenu) {
      const isExpanded = expandedMenus[item.id];
      const hasActiveSubmenu = item.submenu.some(subItem => activeItem === subItem.id);

      return (
        <li key={item.id}>
          <button
            onClick={() => toggleSubmenu(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 
              ${(hasActiveSubmenu || activeItem === item.id)
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm'
                : hoveredItem === item.id
                  ? 'bg-gray-50 text-blue-500'
                  : 'bg-transparent hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : 'justify-start'}`}
            aria-expanded={isExpanded}
            title={collapsed ? item.label : ''}
          >
            <div className={`flex-shrink-0 transition-all duration-300 
              ${hoveredItem === item.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
              ${(hasActiveSubmenu || activeItem === item.id) ? 'text-blue-600' : 'text-gray-600'}`}>
              {item.icon}
            </div>

            {!collapsed && (
              <>
                <span className="ml-3 font-medium overflow-hidden whitespace-nowrap transition-all duration-300"
                  style={{ maxWidth: collapsed ? '0' : '200px', opacity: collapsed ? 0 : 1 }}>
                  {item.label}
                </span>
                <span className="ml-auto">
                  {isExpanded ?
                    <ChevronDown size={16} className="text-gray-500" /> :
                    <ChevronRight size={16} className="text-gray-500" />
                  }
                </span>
              </>
            )}
          </button>

          {/* Submenu items */}
          {!collapsed && (
            <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 
              ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="mt-1 space-y-1">
                {item.submenu.map(subItem => (
                  <li key={subItem.id}>
                    <button
                      onClick={() => {
                        setActiveItem(subItem.id);
                        handleNavigation(subItem.path);
                      }}
                      className={`flex items-center w-full p-2 rounded-lg transition-all duration-300 
                        ${activeItem === subItem.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:bg-blue-50 hover:text-blue-600'}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                      <span className="text-sm">
                        {subItem.label}
                      </span>
                      {activeItem === subItem.id &&
                        <span className="ml-auto w-1 h-4 rounded-full bg-blue-600"></span>
                      }
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      );
    } else {
      // Regular menu item 
      return (
        <li key={item.id}>
          <button
            onClick={() => {
              setActiveItem(item.id);
              handleNavigation(item.path);
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 
              ${activeItem === item.id
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm'
                : hoveredItem === item.id
                  ? 'bg-gray-50 text-blue-500'
                  : 'bg-transparent hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : 'justify-start'}`}
            aria-label={item.label}
            aria-current={activeItem === item.id ? 'page' : undefined}
            title={collapsed ? item.label : ''}
          >
            <div className={`flex-shrink-0 transition-all duration-300 
              ${hoveredItem === item.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
              ${activeItem === item.id ? 'text-blue-600' : 'text-gray-600'}`}>
              {item.icon}
            </div>

            {!collapsed && (
              <span className="ml-3 font-medium overflow-hidden whitespace-nowrap transition-all duration-300"
                style={{ maxWidth: collapsed ? '0' : '200px', opacity: collapsed ? 0 : 1 }}>
                {item.label}
              </span>
            )}

            {!collapsed && activeItem === item.id && (
              <span className="ml-auto w-1.5 h-5 rounded-full bg-blue-600 transition-all duration-300"></span>
            )}
          </button>
        </li>
      );
    }
  };

  // Mobile menu item 
  const renderMobileMenuItem = (item) => {
    if (item.hasSubmenu) {
      const isExpanded = expandedMenus[item.id];
      const hasActiveSubmenu = item.submenu.some(subItem => activeItem === subItem.id);

      return (
        <li key={item.id} style={{ animationDelay: `${50}ms` }}
          className={`transition-all duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 
              ${(hasActiveSubmenu || activeItem === item.id)
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-medium shadow-sm'
                : 'hover:bg-blue-50 hover:text-blue-600'}`}
            aria-expanded={isExpanded}
          >
            <div className={`${(hasActiveSubmenu || activeItem === item.id) ? 'text-blue-600' : 'text-gray-600'}`}>
              {item.icon}
            </div>
            <span className="ml-3 font-medium">
              {item.label}
            </span>
            <span className="ml-auto">
              {isExpanded ?
                <ChevronDown size={16} className="text-gray-500" /> :
                <ChevronRight size={16} className="text-gray-500" />
              }
            </span>
          </button>

          {/* Mobile submenu */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 
            ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="mt-1 space-y-1">
              {item.submenu.map((subItem, subIndex) => (
                <li key={subItem.id}
                  style={{ animationDelay: `${(subIndex + 1) * 50}ms` }}
                  className={`transition-all duration-300 ease-out 
                      ${isExpanded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <button
                    onClick={() => {
                      setActiveItem(subItem.id);
                      handleNavigation(subItem.path);
                    }}
                    className={`flex items-center w-full p-2 rounded-lg transition-all duration-300 
                      ${activeItem === subItem.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-sm">
                      {subItem.label}
                    </span>
                    {activeItem === subItem.id &&
                      <span className="ml-auto w-1 h-4 rounded-full bg-blue-600"></span>
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    } else {
      // Regular mobile menu item
      return (
        <li key={item.id} style={{ animationDelay: `${50}ms` }}
          className={`transition-all duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <button
            onClick={() => {
              setActiveItem(item.id);
              handleNavigation(item.path);
            }}
            className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 
              ${activeItem === item.id
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-medium shadow-sm'
                : 'hover:bg-blue-50 hover:text-blue-600'}`}
            aria-label={item.label}
            aria-current={activeItem === item.id ? 'page' : undefined}
          >
            <div className={`${activeItem === item.id ? 'text-blue-600' : 'text-gray-600'}`}>
              {item.icon}
            </div>
            <span className="ml-3 font-medium">
              {item.label}
            </span>
            {activeItem === item.id &&
              <span className="ml-auto w-1.5 h-5 rounded-full bg-blue-600"></span>
            }
          </button>
        </li>
      );
    }
  };

  return (
    <>
      {/* Toast */}
      <ToastContainer position="bottom-right" className="toast-container" />

      {/* Mobile Menu Toggle Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 
        transition-all duration-300 ${mobileMenuOpen ? 'rotate-180' : 'rotate-0'} ${isScrolled ? 'shadow-md' : ''}`}
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
      >
        <div className="relative">
          <Menu size={24} className="text-blue-600" />
          <span className={`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ${mobileMenuOpen ? 'opacity-0' : 'animate-pulse'}`}></span>
        </div>
      </button>

      {/* Mobile Menu with drop down */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-500 
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`bg-white h-full w-72 shadow-2xl transform transition-all duration-500 ease-out 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Admin Panel</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => renderMobileMenuItem(item))}
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center group cursor-pointer" onClick={handleNavigate}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center 
                       transition-transform duration-300 group-hover:scale-110 shadow-md">
                    <span className="text-sm font-bold text-white">AD</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-3 transition-all duration-300 group-hover:translate-x-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-all duration-300 hover:scale-105 
                           bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen transition-all duration-500 ease-in-out shadow-lg z-30
          hidden md:block ${collapsed ? 'w-20' : 'w-64'} 
          ${isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className={`h-8 w-8 rounded-md bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center 
                 transition-all duration-500 ${collapsed ? 'scale-110' : 'scale-100'}`}>
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!collapsed && (
              <h1 className="text-xl font-bold overflow-hidden whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent 
                     transition-all duration-500 ease-out" style={{ maxWidth: collapsed ? '0' : '200px', opacity: collapsed ? 0 : 1 }}>
                Admin Panel
              </h1>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu
              size={20}
              className={`transition-transform duration-500 text-gray-600 ${collapsed ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center group cursor-pointer" onClick={handleNavigate}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center 
                     transition-transform duration-300 group-hover:scale-110 shadow-md">
                  <span className="text-sm font-bold text-white">SP</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              {!collapsed && (
                <div className="ml-3 transition-all duration-300 group-hover:translate-x-1"
                  style={{ maxWidth: collapsed ? '0' : '120px', opacity: collapsed ? 0 : 1 }}>
                  <p className="text-sm font-medium">Saju P</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-all duration-300 hover:scale-105 
                           bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx global>{`
        .page-transition {
          opacity: 0.8;
          transition: opacity 0.3s ease-out;
        }
        
        .fade-out {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }
        
        .logout-toast {
          font-weight: 500;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .logout-toast-success {
          background: linear-gradient(to right, #e6f7ff, #f0f9ff);
        }
        
        .logout-progress {
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }
        
        .error-toast {
          border-left: 4px solid #ef4444;
        }
      `}</style>

      <div className={`md:pl-20 lg:pl-64 transition-all duration-500 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}></div>
    </>
  );
};

export default Navbar;