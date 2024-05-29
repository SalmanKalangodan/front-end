// src/components/OrderDetails.js

import React from 'react';

const OrderDetails = () => {

    const order ={
        orderNumber: '12345',
        date: '2024-05-29',
        status: 'Shipped',
        items: [
          { name: 'Product 1', quantity: 2, price: 29.99, image: 'https://via.placeholder.com/150' },
          { name: 'Product 2', quantity: 1, price: 49.99, image: 'https://via.placeholder.com/150' },
          { name: 'Product 3', quantity: 3, price: 9.99, image: 'https://via.placeholder.com/150' }
        ],
        totalCost: 139.94
      };
  return (
    <div className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Order Information</h3>
        <div className="mt-3 space-y-1 text-gray-600">
          <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
          <p><span className="font-medium">Date:</span> {order.date}</p>
          <p><span className="font-medium">Status:</span> {order.status}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Items</h3>
        <div className="mt-4 space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4"/>
              <div>
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700">Total Cost</h3>
        <p className="mt-2 text-2xl font-bold text-gray-800">${order.totalCost.toFixed(2)}</p>
      </div>
    </div>
  </div>
  );
};

export default OrderDetails;
