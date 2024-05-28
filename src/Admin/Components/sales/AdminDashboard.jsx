import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function AdminDashboard() {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSellQuantity, setTotalSellQuantity] = useState(0);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('/api/sales');
      setSales(response.data);
      calculateTotalRevenue(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const filterSales = async () => {
    try {
      const response = await axios.post('/api/sales/filter', { startDate, endDate });
      setSales(response.data);
      calculateTotalRevenue(response.data);
    } catch (error) {
      console.error('Error filtering sales:', error);
    }
  };

  const calculateTotalRevenue = (data) => {
    let revenue = 0;
    let quantity = 0;
    data.forEach((sale) => {
      revenue += sale.total_revenue || 0;
      quantity += sale.total_sell_qnt || 0;
    });
    setTotalRevenue(revenue);
    setTotalSellQuantity(quantity);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Sales Reports</h2>
        <div className="flex mb-4">
          <input
            type="date"
            className="mr-2 p-2 border border-gray-300 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="mr-2 p-2 border border-gray-300 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn btn-primary" onClick={filterSales}>Filter</button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full text-sm text-left table-striped">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity Sold</th>
                <th className="px-4 py-3">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sales?.map((sale, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{sale?.product_name}</td>
                  <td className="px-4 py-3">${sale?.product_price}</td>
                  <td className="px-4 py-3">{sale?.total_qnt}</td>
                  <td className="px-4 py-3">${sale?.total_price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td className="px-4 py-3 font-semibold">Total</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 font-semibold">{totalSellQuantity}</td>
                <td className="px-4 py-3 font-semibold">${totalRevenue}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
