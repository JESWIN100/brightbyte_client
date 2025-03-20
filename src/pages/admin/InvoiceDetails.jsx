import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import brightByteLogo from "../../assets/bright_byte-removebg-preview.png";

export default function InvoiceDetails() {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getbyidinvoice/${id}`);
        setInvoice(response.data.invoice);
      } catch (error) {
        setError("Failed to fetch invoice. Please try again.");
        console.error("Error fetching invoice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => window.print();

  if (isLoading) return <p className="text-center text-gray-600">Loading invoice...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!invoice) return <p className="text-center text-gray-600">No invoice found.</p>;

  // Calculate total GST amount
  const totalGST = parseFloat(invoice.grandTotal) - parseFloat(invoice.taxableAmount);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 shadow-lg rounded-lg">
      {/* Company Header */}
      <div className="text-center mb-6">
        {/* Replace the h1 with an image */}
        <div className="flex justify-center mb-2">
          <img
            src={brightByteLogo}
            alt="BRIGHT BYTE"
            className="h-32"
          />
        </div>
        <p className="mt-1">Medakkunnu malayli, Moottoli, Kakkodi, Kozhikode - 673611</p>
        <p>Mobile: +91-9633799929, +91-8111909929</p>
        <p>Email: veltekindustries@gmail.com</p>
        <p>GSTIN: 32CXLPP7340E1ZG</p>
      </div>

      <h2 className="text-xl text-gray-950 font-bold text-center mb-4">TAX INVOICE</h2>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p><span className="font-semibold">Invoice No:</span> {invoice.invoiceNo}</p>
          <p><span className="font-semibold">Invoice Date:</span> {invoice.date}</p>
        </div>
        <div>
          <h3 className="font-semibold">BILL TO</h3>
          <p>{invoice.name}</p>
          <p>{invoice.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="border p-2">SL.NO</th>
              <th className="border p-2">NAME</th>
              <th className="border p-2">ML</th>
              <th className="border p-2">PRICE</th>
              <th className="border p-2">QTY</th>
              <th className="border p-2">GST%</th>
              <th className="border p-2 text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.ml}</td>
                <td className="border p-2">₹ {item.unitPrice}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.gst}%</td>
                <td className="border p-2 text-right">₹ {item.grossValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>₹ {invoice.taxableAmount}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>GST Amount</p>
          <p>₹ {totalGST.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <p>Total Amount</p>
          <p>₹ {invoice.grandTotal}</p>
        </div>
        <p className="mt-2 text-sm text-gray-600">{invoice.totalInWords}</p>
      </div>

      {/* Payment QR Code */}
      <div className="mt-6 text-center">
        <p className="font-semibold text-sm">PAYMENT QR CODE</p>
        <img
          src={`https://quickchart.io/qr?text=${encodeURIComponent(
            `upi://pay?pa=sajuputhukkudi@oksbi&pn=BRIGHTBYTE&mc=0000&tid=INV-${invoice.invoiceNo}&tr=INV-${invoice.invoiceNo}&tn=Invoice Payment&am=${invoice.grandTotal || 0}&cu=INR`
          )}`}
          alt="QR Code"
          className="w-28 h-28 mx-auto mt-2 border-2 border-gray-300 shadow-lg"
        />
        <p className="mt-2 text-sm">UPI ID: sajuputhukkudi@oksbi</p>
      </div>

      {/* Print Button (Hidden when printing) */}
      <button
        onClick={handlePrint}
        className="mt-6 w-32 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition print:hidden"
      >
        Print Invoice
      </button>

      {/* Signature */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Authorised Signature for
          VELTEK  INDUSTRIES</p>
      </div>
    </div>
  );
}