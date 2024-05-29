// src/components/OrderDetails.js

import React from 'react';

const OrderDetails = () => {

    const order ={
        orderNumber: '12345',
        date: '2024-05-29',
        status: 'Shipped',
        items: [
          { name: 'Product 1', quantity: 2, price: 29.99 },
          { name: 'Product 2', quantity: 1, price: 49.99 },
          { name: 'Product 3', quantity: 3, price: 9.99 }
        ],
        totalCost: 139.94
      };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order Information</h3>
        <div className="mt-2 space-y-1">
          <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
          <p><span className="font-medium">Date:</span> {order.date}</p>
          <p><span className="font-medium">Status:</span> {order.status}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Items</h3>
        <div className="mt-2 space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <p><span className="font-medium">Product:</span> {item.name}</p>
              <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
              <p><span className="font-medium">Price:</span> ${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Total Cost</h3>
        <p className="mt-2 text-xl font-bold">${order.totalCost.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
