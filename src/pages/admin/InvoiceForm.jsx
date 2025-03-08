import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceForm = () => {
  const [items, setItems] = useState([{ description: '', ml: '', unitPrice: '', quantity: '', gst: '', grossValue: '' }]);
  const { register, handleSubmit, reset } = useForm();

  const addItem = () => {
    setItems([...items, { description: '', ml: '', unitPrice: '', quantity: '', gst: '', grossValue: '' }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'description') {
      const product = descriptions.find(desc => desc.name === value);
      updatedItems[index].id = product ? product.id : ''; // Add the product ID
    }

    setItems(updatedItems);
  };

  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchdescription = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallProduct`, { withCredentials: true });
        const filteredData = response.data.data.map(product => ({
          name: product.name,
          id: product._id
        }));
        console.log("Filtered Data:", filteredData);

        setDescriptions(filteredData)
      } catch (error) {
        console.error('Error fetching product count:', error);
        toast.error('Failed to fetch product list');
      }
    };

    fetchdescription();
  }, []);

  const onSubmit = async (data) => {
    const payload = { ...data, items };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/createinvoice`, payload);
      toast.success('Invoice submitted successfully!');

      // Log items details
      items.forEach(item => {
        console.log(`ID: ${item.id}, Description: ${item.description}, Quantity: ${item.quantity}, GST: ${item.gst}%`);
      });

      // Update product quantities
      let allUpdatesSuccessful = true;
      for (const item of items) {
        const product = descriptions.find(desc => desc.name === item.description);

        if (product) {
          try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/updateProductQuantity/${item.id}`, {
              quantity: item.quantity
            });
          } catch (error) {
            console.error(`Failed to update quantity for ${item.description}:`, error);
            toast.warning(`Failed to update inventory for ${item.description}`);
            allUpdatesSuccessful = false;
          }
        }
      }

      if (allUpdatesSuccessful) {
        toast.info('All inventory quantities updated');
      }

      // Reset form after successful submission
      reset();
      setItems([{ description: '', ml: '', unitPrice: '', quantity: '', gst: '', grossValue: '' }]);

      console.log(response);
    } catch (error) {
      toast.error('Failed to submit invoice');
      console.error('Invoice submission error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Check your network connection.');
      } else {
        // Something happened in setting up the request
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4 md:ml-52"
    >
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="p-8">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center mb-4 text-blue-800 tracking-tight"
          >
            VELTEK ELECTRONIC INDUSTRIES
          </motion.h2>
          <p className="text-center text-gray-600 mb-2">Kakkodi, Calicut</p>
          <p className="text-center text-gray-600 mb-8">GSTIN: 32CXLPP7340E1ZG</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {['invoiceNo', 'date', 'name', 'address', 'gstin'].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  {...register(field)}
                  type={field === 'date' ? 'date' : 'text'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:shadow-sm"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    {['Sl. No.', 'Description of Goods', 'ML', 'Unit Price', 'Qty.', 'GST (%)', 'Gross Value', 'Actions'].map((header) => (
                      <th key={header} className="p-3 text-left text-sm font-semibold text-blue-800 border-b">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="p-3 text-center">{index + 1}</td>
                      <td className="p-3">
                        <select
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select a description</option>
                          {descriptions.map((desc) => (
                            <option key={desc.id} value={desc.name}>{desc.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={item.ml}
                          onChange={(e) => handleItemChange(index, 'ml', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="ML"
                        />
                      </td>
                      {['unitPrice', 'quantity'].map((field) => (
                        <td key={field} className="p-3">
                          <input
                            type="number"
                            value={item[field]}
                            onChange={(e) => handleItemChange(index, field, e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </td>
                      ))}
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.gst}
                          onChange={(e) => handleItemChange(index, 'gst', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="GST %"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.grossValue}
                          onChange={(e) => handleItemChange(index, 'grossValue', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="p-3">
                        <motion.button
                          type="button"
                          onClick={() => removeItem(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                          disabled={items.length === 1}
                        >
                          Remove
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.button
              type="button"
              onClick={addItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Item
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid md:grid-cols-2 gap-6 mt-8"
          >
            {['totalInWords', 'taxableAmount', 'cgst', 'sgst', 'igst', 'grandTotal'].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                  {['cgst', 'sgst', 'igst'].includes(field) && ' (%)'}
                </label>
                <input
                  {...register(field)}
                  type={['taxableAmount', 'cgst', 'sgst', 'igst', 'grandTotal'].includes(field) ? 'number' : 'text'}
                  step={['taxableAmount', 'cgst', 'sgst', 'igst', 'grandTotal'].includes(field) ? '0.01' : undefined}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:shadow-sm"
                />
              </motion.div>
            ))}

            <div className="col-span-2 flex justify-end mt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Invoice
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default InvoiceForm;