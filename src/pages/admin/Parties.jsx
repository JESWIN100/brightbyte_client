import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Parties = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedParty, setSelectedParty] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Store filtered invoices

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/invoice/getallinvoice`
        );
        setInvoices(response.data.invoices);
        
        // Extract unique party names
        const names = response.data.invoices
        .filter((item) => item.name && item.name.trim() !== "---") // Filter out invalid names first
        .map((item) => ({ name: item.name, paymentStatus: item.paymentStatus })) // Map to an object
        .filter((item, index, self) => 
          index === self.findIndex((t) => t.name === item.name) // Ensure unique names
        );
      
      console.log(names);
      

        setPartyList(names);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Handle party selection
  const handlePartyClick = (party) => {
    setSelectedParty(party);
    
    // Filter invoices based on selected party
    const filteredData = invoices.filter((invoice) => invoice.name === party);
    setFilteredInvoices(filteredData);
    console.log("filteredData",filteredData);
    
  };

  return (
    <div className="flex min-h-screen">
      <div className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Search Party</h3>
            <input
              type="text"
              placeholder="Search Party"
              className="border p-2 rounded w-full mt-2 focus:ring focus:ring-purple-300"
            />
         <ul className="mt-4 space-y-2">
  {partyList.map((party, index) => (
    <li
      key={index}
      className={`p-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-purple-200 ${
        selectedParty === party ? "bg-purple-500 text-white font-bold" : ""
      }`}
      onClick={() => handlePartyClick(party.name)}
    >
      <span>{party.name} - </span>
      <span
  className={`font-semibold ${
    party.paymentStatus === "unpaid" ? "text-red-600" : "text-green-600"
  }`}
>
  {party.paymentStatus}
</span>

    </li>
  ))}
</ul>

          </div>

          {/* Right Content Area */}
          <div className="w-3/4 p-4">
            <h2 className="text-2xl font-bold">VELTEK INDUSTRIES</h2>
            <p>Phone no: </p>
            <p className="mt-4">
              To, <strong>{selectedParty || "Select a party"}</strong>
            </p>

            <div className="flex justify-between items-center mt-4">
              <p>2024-03-21 - 2025-03-20</p>
             
            </div>

            {/* Party Transactions Table */}
            <table className="table-auto w-full mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Voucher</th>
                  <th className="border px-4 py-2">Sr No</th>
                  <th className="border px-4 py-2">Credit</th>
                  <th className="border px-4 py-2">Debit</th>
                  {/* <th className="border px-4 py-2">TDS deducted by party</th> */}
                  {/* <th className="border px-4 py-2">TDS deducted by self</th> */}
                  <th className="border px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
             

                {/* Show filtered transactions */}
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{row.date}</td>
                      <td className="border px-4 py-2">Invoivce</td>
                      <td className="border px-4 py-2">{row.invoiceNo}</td>
                      <td className="border px-4 py-2">{row.credit}</td>
                      <td className="border px-4 py-2">{row.grandTotal}</td>
                      {/* <td className="border px-4 py-2">0.00</td> */}
                      {/* <td className="border px-4 py-2">0.00</td> */}
                      <td className="border px-4 py-2">{row.balance}</td>
                  
                    </tr>
                 
                    
                  ))
                  
                ) : (
                  <tr>
                    <td colSpan="8" className="border px-4 py-2 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}

              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parties;
