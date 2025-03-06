import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);

  const {id} =useParams()

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getbyidinvoice/${id}`);
        setInvoice(response.data.invoice);
        console.log(response);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div   className="
    flex min-h-screen 
    bg-gradient-to-br from-gray-50 to-gray-200 
    print:bg-[url('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrvrbzqNMIxzlhqldPIe9m7hGn2WT_CLuZcwi6FYXnML7RUpzZ')] 
    print:bg-cover print:bg-no-repeat print:bg-center print:h-full
  "
>
      <div className={'ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1'}>
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold">{invoice?.companyName}</h1>
              <p className="text-gray-600">{invoice?.companyTagline}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-green-600">INVOICE</h2>
              <p>Invoice Number: #{invoice.invoiceNo}</p>
              <p>Invoice Date: {invoice.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 my-8">
          <div>
              <h3 className="text-lg font-semibold">Invoice From:</h3>
              <p>Saju P</p>
              <p>BrightByte</p>
              <p>Phone: +91-9633799929</p>
              <p>Email: veltekindustries@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Invoice To:</h3>
              <p>{invoice?.name}</p>
              {/* <p>{invoice?.client?.title}, {invoice.client?.company}</p>
              <p>Phone: {invoice.client?.phone}</p>
              <p>Email: {invoice.client?.email}</p> */}
            </div>
           
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2">No.</th>
                <th className="p-2">Product Description</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">₹{item.unitPrice}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">₹{item.grossValue}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right my-8">
            <p>Subtotal: ₹{invoice.subtotal}</p>
            <p>Taxable Amount: ₹{invoice.taxableAmount}</p>
            <p>Total in Words: {invoice.totalInWords}</p>

            <h3 className="text-xl font-bold text-green-600">Total: ₹{invoice.grandTotal}</h3>
          </div>

          <div className="my-8">
            <h3 className="font-semibold">Payment Method:</h3>
            <p>Account No: {invoice.payment?.accountNumber}</p>
            <p>Account Name: {invoice.payment?.accountName}</p>
            <p>Branch Name: {invoice.payment?.branchName}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600">{invoice.terms}</p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;