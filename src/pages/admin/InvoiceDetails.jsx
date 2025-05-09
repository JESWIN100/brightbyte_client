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

  const totalGST = parseFloat(invoice.grandTotal) - parseFloat(invoice.taxableAmount);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 shadow-xl rounded-lg">
      
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <p className="font-semibold">Invoice No: {invoice.invoiceNo}</p>
          <p className="font-semibold">Invoice Date: {invoice.date}</p>
        </div>
        
        
        <div className="text-left text-sm">
        <div className="ml-9">
        <img src={brightByteLogo} alt="BRIGHT BYTE" className="h-24 " />

        </div>
          <p className="mt-1 text-gray-700">Medakkunnu, Moottoli, Kakkodi, Kozhikode - 673611</p>
          <p>Mobile: +91-9633799929, +91-8111909929</p>
          <p>Email: veltekindustries@gmail.com</p>
          <p>GSTIN: 32CXLPP7340E1ZG</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">TAX INVOICE</h2>

      <div className="grid grid-cols-2 gap-6 text-sm mb-6">
        <div>
          <h3 className="font-semibold">BILL TO</h3>
          <p>{invoice.name}</p>
          <p>{invoice.address}</p>
        </div>
        <div>
          <h3 className="font-semibold">SHIP TO</h3>
          <p>{invoice.name}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
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
              <tr key={item.id} className="text-center border-t">
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

      <div className="mt-6 flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm">PAYMENT QR CODE</p>
          <p className="mt-2 text-sm">UPI ID: sajuputhukkudi@oksbi</p>
        </div>
        <div>
          <img
            src={`https://quickchart.io/qr?text=${encodeURIComponent(
              `upi://pay?pa=sajuputhukkudi@oksbi&pn=BRIGHTBYTE&mc=0000&tid=INV-${invoice.invoiceNo}&tr=INV-${invoice.invoiceNo}&tn=Invoice Payment&am=${invoice.grandTotal || 0}&cu=INR`
            )}`}
            alt="QR Code"
            className="w-24 h-24 border-2 border-gray-300 shadow-md"
          />
        </div>
        <div className="text-right text-sm">
          <p>Subtotal: ₹ {invoice.taxableAmount}</p>
          <p>GST Amount: ₹ {totalGST.toFixed(2)}</p>
          <p className="font-bold text-lg mt-2">Total Amount: ₹ {invoice.grandTotal}</p>
          <p className="mt-2 text-gray-600">{invoice.totalInWords}</p>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 w-40 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition print:hidden"
      >
        Print Invoice
      </button>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Authorized Signature for VELTEK INDUSTRIES</p>
      </div>
    </div>
  );
}