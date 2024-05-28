import React, {  useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {AdminOrder} from '../../../Redux/ApiSlice/Tunk/Tunk'

// const orders = [
//   { id: 1, customer: 'John Doe', date: '2024-05-18', total: '$150.00', status: 'Shipped' },
//   { id: 2, customer: 'Jane Smith', date: '2024-05-17', total: '$200.00', status: 'Processing' },
//   { id: 3, customer: 'Bob Johnson', date: '2024-05-16', total: '$350.00', status: 'Delivered' },
//   // Add more orders as needed
// ];

function AdminOrders() {
    const dispacth = useDispatch()
    const [orders , setOrders] = useState([])
       useEffect(()=>{
         dispacth(AdminOrder()).then((res)=>{
            setOrders(res.payload)
         })
       },[])
        
   
    console.log(orders);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{order.orderId}</td>
                <td className="py-3 px-6 text-left">{order.address.split(' ').splice(11,1).join().split(',').splice(0,1).join()}</td>
                <td className="py-3 px-6 text-left">{order.ordertime}</td>
                <td className="py-3 px-6 text-left">{order.totalprice}</td>
                <td className="py-3 px-6 text-left">{order.status}</td>
                <td className="py-3 px-6 text-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 shadow">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
