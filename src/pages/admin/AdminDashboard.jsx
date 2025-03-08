import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Package, DollarSign, BarChart2 } from 'lucide-react';
import Navbar from '../../components/Admin/Navbar.jsx';
import axios from 'axios';

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [count, setCount] = useState()
  const [data, setData] = useState([])
  const [salesDatda, setSalesData] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data 
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', description: 'Noise cancelling wireless headphones', price: 199.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 45 },
    { id: 2, name: 'Smart Watch', description: 'Fitness tracker with heart rate monitor', price: 149.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 32 },
    { id: 3, name: 'Wireless Earbuds', description: 'True wireless earbuds with charging case', price: 89.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 78 },
    { id: 4, name: 'Bluetooth Speaker', description: 'Waterproof portable speaker', price: 79.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 23 },
  ]);



  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getallinvoice`);
      console.log(response.data.invoices);
  
      const salesData = response.data.invoices.map(item => ({
        date: item.date,
        quantity: item.items.reduce((total, currentItem) => total + Number(currentItem.quantity), 0),
        price:item.grandTotal
      }));
  
      setSalesData(salesData);
      console.log("Sales Data:", salesData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  
  // Use useEffect to control when it fetches
  useEffect(() => {
    fetchSalesData();
  }, []);
 
  
 

  // Sample sales data for charts
  
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const salesByMonth = salesDatda.reduce((acc, { date, quantity }) => {
    const monthIndex = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
  
    if (year === 2025) { // Filter only for the year 2025
      const monthName = monthNames[monthIndex];
      acc[monthName] = (acc[monthName] || 0) + quantity;
    }
  
    return acc;
  }, {});
  
  const salesData = monthNames.map(month => ({
    name: month,
    sales: salesByMonth[month] || 0
  }));
  
  console.log("fffffffffffffffffffffff",salesData);
  

  //pice chart
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallProduct`, { withCredentials: true });
        const filteredData = response.data.data.map(product => ({
          name: product.name,
          quantity: product.stockNum
        }));
        console.log("Filtered Data:", filteredData);
        setData(filteredData)
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchCount();
  }, []);


  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff4242', '#e70feb', '#1e3e3e',
    '#A52A2A', '#5F9EA0', '#7FFF00', '#D2691E', '#FF7F50', '#6495ED', '#DC143C',
    '#8A2BE2', '#20B2AA'
  ];


  // Function to determine bar color based on sales value
  const getBarColor = (value) => {
    if (value < 2000) {
      return "#ef4444";
    } else if (value >= 2000 && value < 4000) {
      return "#f97316";
    } else {
      return "#22c55e";
    }
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/productcount`, { withCredentials: true });
        setCount(response.data.data)
        // console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchCount();
  }, []);



  // Total sales this month (sample data)
  const currentMonthSales = salesData[new Date().getMonth()].sales;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Navbar />

      <div className={`${isMobile ? 'ml-0 pt-16' : 'md:ml-0 lg:ml-6'} flex-1 p-0 transition-all duration-300`}>
        <div className="h-4 md:h-6"></div>
        <div className="pr-4 md:pr-6">

          <header className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>
          </header>

          {/* Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6 mx-4">
            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Package size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Total Products</h2>
                <p className="text-2xl md:text-3xl font-bold">{count}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Monthly Sales</h2>
                <p className="text-2xl md:text-3xl font-bold">{currentMonthSales.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <BarChart2 size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Avg. Total Price</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  ₹{products.length > 0
                    ? (salesDatda.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
                    : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 mx-4">
            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Sales Overview</h2>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}
                    margin={{
                      top: 5,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 0 : 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      tickFormatter={isMobile ? (tick, index) => index % 2 === 0 ? tick : '' : undefined}
                    />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Monthly Sales Comparison</h2>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 0 : 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      tickFormatter={isMobile ? (tick, index) => index % 2 === 0 ? tick : '' : undefined}
                    />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                    <Bar dataKey="sales" animationDuration={1500} animationBegin={300}>
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.sales)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Products Overview</h2>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="quantity"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Link to Products Page */}
          <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 mx-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base md:text-lg font-semibold">Products Management</h2>
              <a href="/admin/products-list" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">View all products <span className="ml-1">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;