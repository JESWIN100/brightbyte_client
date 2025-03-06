import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getallinvoice`);
        setInvoices(response.data.invoices);
        console.log(response);
        
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handlenavigate=(id)=>{
    navigate(`/admin/invoice/listid/${id}`)
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className={'ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1'}>
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">All Invoices</h2>
      <table className="w-full border-collapse border text-left bg-white shadow-2xl rounded-2xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Invoice No.</th>
            <th className="border p-3">Date</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Total Amount</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.reverse().map((invoice) => (
            <tr key={invoice._id} className="hover:bg-gray-50">
              <td className="border p-3">{invoice.invoiceNo}</td>
              <td className="border p-3">{invoice.date}</td>
              <td className="border p-3">{invoice.name}</td>
              <td className="border p-3">{invoice.grandTotal}</td>
              <td className="border p-3 text-center">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600" onClick={() => handlenavigate(invoice._id)}
              >View</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default InvoiceList;
