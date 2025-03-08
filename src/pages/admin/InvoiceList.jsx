import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpDown, Eye, Loader2 } from 'lucide-react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getallinvoice`);
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/admin/invoice/listid/${id}`);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Sort by invoiceNo in descending order
  const sortedInvoices = [...invoices].sort((a, b) => b.invoiceNo - a.invoiceNo);

  const filteredInvoices = sortedInvoices.filter(invoice =>
    invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNo.toString().includes(searchTerm)
  );

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    },
    hover: {
      scale: 1.01,
      backgroundColor: 'rgba(243, 244, 246, 1)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <div className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1">
        <motion.div
          className="container mx-auto p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-4xl font-extrabold text-center mb-8 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              All Invoices
            </span>
          </motion.h2>

          <motion.div
            className="bg-white rounded-3xl shadow-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or invoice number..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">No invoices found</p>
                <p className="mt-2">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  /* Hide scrollbar for Chrome, Safari and Opera */
                  .overflow-x-auto::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <motion.table
                  className="w-full border-collapse text-left"
                  variants={tableVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
                    <tr>
                      <th className="p-4 rounded-tl-xl">Invoice No.</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4 rounded-tr-xl text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice._id}
                        variants={rowVariants}
                        whileHover="hover"
                        className="border-b border-gray-200 last:border-0"
                      >
                        <td className="p-4 font-medium">{invoice.invoiceNo}</td>
                        <td className="p-4">
                          {new Date(invoice.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4">{invoice.name}</td>
                        <td className="p-4 font-semibold">
                          ₹{parseFloat(invoice.grandTotal).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>
                        <td className="p-4 text-center">
                          <motion.button
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                            onClick={() => handleNavigate(invoice._id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoiceList;