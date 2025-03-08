import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import companyLogo from '../../assets/bright_byte-removebg-preview.png';
import { motion } from 'framer-motion';

// Global style for print that hides unnecessary elements
const PrintStyles = () => (
  <style>
    {`
      @media print {
        body, html {
          padding: 0 !important;
          margin: 0 !important;
        }
        .print-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 0 !important;
        }
      }
    `}
  </style>
);

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getbyidinvoice/${id}`);
        setInvoice(response.data.invoice);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 font-medium">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-red-500">No invoice data found</h2>
        <p className="text-gray-600 mt-2">The requested invoice could not be located.</p>
      </div>
    </div>
  );

  // Calculate total items
  const totalItems = invoice.items.reduce((acc, item) => acc + parseInt(item.quantity), 0);

  return (
    <>
      <PrintStyles />
      <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-100 print:bg-white print:from-white print:to-white print:bg-none print:h-full">
        <div className="flex-1 p-4 md:p-6 mt-1 w-full print:p-0 print-container">
          <motion.div
            className="max-w-4xl mx-auto bg-white shadow-2xl p-8 rounded-2xl backdrop-blur-sm bg-opacity-90 print:shadow-none print:p-1 print:max-w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header Section */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src={companyLogo || 'https://example.com/default-logo.png'}
                    alt="Company Logo"
                    className="h-32 w-auto"
                  />
                </motion.div>
              </div>

              <div className="text-right mt-4 md:mt-0">
                <motion.h2
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 mb-3 print:text-green-600"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  INVOICE
                </motion.h2>
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100 shadow-inner print:bg-white print:shadow-none print:border-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="font-medium">Invoice #: <span className="text-blue-600 font-bold">{invoice.invoiceNo}</span></p>
                  <p className="font-medium">Date: <span className="text-blue-600">{invoice.date}</span></p>
                  <p className="font-medium mt-2 text-xs text-gray-500">Items: {totalItems}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Address Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8"
              variants={itemVariants}
            >
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-md transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-green-500 print:bg-white print:shadow-none print:hover:shadow-none print:hover:translate-y-0 print:border-l print:border-gray-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-lg font-semibold text-green-700 mb-2 border-b border-green-200 pb-2 flex items-center print:text-gray-700 print:border-gray-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Invoice From:
                </h3>
                <p className="font-medium">Saju P</p>
                <p>BrightByte</p>
                <p>Phone: +91-9633799929, +91-8111909929</p>
                <p>Email: veltekindustries@gmail.com</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-md transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-blue-500 print:bg-white print:shadow-none print:hover:shadow-none print:hover:translate-y-0 print:border-l print:border-gray-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2 border-b border-blue-200 pb-2 flex items-center print:text-gray-700 print:border-gray-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Invoice To:
                </h3>
                <p className="font-medium">{invoice?.name || 'Client Name'}</p>
                <p>{invoice?.address || ''} </p>
                <p className="mt-1 inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-sm print:bg-gray-100 print:text-gray-800">GSTIN: {invoice?.gstin || 'N/A'}</p>
              </motion.div>
            </motion.div>

            {/* Table Section */}
            <motion.div
              className="overflow-hidden rounded-xl shadow-lg border border-gray-100 print:shadow-none print:border print:border-gray-300"
              variants={itemVariants}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white print:bg-gray-200 print:text-black">
                      <th className="p-3 rounded-tl-lg print:rounded-none">#</th>
                      <th className="p-3">Product Description</th>
                      <th className="p-3">ML</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">GST %</th>
                      <th className="p-3 rounded-tr-lg print:rounded-none">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <motion.tr
                        key={index}
                        className={`border-b transition-colors duration-300 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                        whileHover={{ backgroundColor: "#f0f9ff" }}
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-medium">{item.description}</td>
                        <td className="p-3">{item.ml || '-'}</td>
                        <td className="p-3">₹{item.unitPrice}</td>
                        <td className="p-3">
                          <span className="inline-block bg-green-100 text-green-800 text-center rounded-full px-2 py-1 min-w-6 text-sm print:bg-white print:border print:border-gray-300">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-center rounded-full px-2 py-1 min-w-6 text-sm print:bg-white print:border print:border-gray-300">
                            {item.gstPercentage}-
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-green-700 print:text-gray-800">₹{item.grossValue}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Summary Section */}
            <motion.div
              className="mt-8 flex flex-col md:flex-row md:justify-end"
              variants={itemVariants}
            >
              <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl shadow-lg border border-blue-100 print:bg-white print:shadow-none print:border print:border-gray-300">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₹ {invoice.taxableAmount}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">GST Amount:</span>
                  <span className="font-medium">₹ {invoice.gstAmount || (invoice.grandTotal - invoice.taxableAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 mt-2">
                  <span className="text-xl font-bold text-gray-700">Grand Total:</span>
                  <motion.span
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 print:text-green-700"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      repeat: 2,
                      repeatType: "reverse",
                      duration: 0.3,
                      delay: 1.5
                    }}
                  >
                    ₹{invoice.grandTotal}
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Thank You Section */}
            <motion.div
              className="mt-10 pt-6 border-t text-center"
              variants={fadeInVariants}
            >
              <div className="w-full p-6 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="mb-3">For any questions concerning, please contact us.</p>
                <p className="text-sm flex items-center justify-center">
                  Powered by <span className="font-italic ml-1"><i>Veltek Industries</i></span>
                </p>
              </div>
            </motion.div>

            {/* Print Button */}
            <motion.div
              className="text-center mt-6 print:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <button
                onClick={handlePrint}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 print:hidden flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Invoice
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;