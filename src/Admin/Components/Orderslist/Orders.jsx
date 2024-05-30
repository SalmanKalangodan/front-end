import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  GetSingleOrders } from '../../../Redux/ApiSlice/Tunk/Tunk';
import { Link, useParams } from 'react-router-dom';

const OrderDetails = () => {
   const dispacth = useDispatch()
   const {id} = useParams()
   const [order , setOder] =  useState([])
   useEffect(()=>{
    dispacth(GetSingleOrders(id)).then((res)=>{
      setOder(res.payload);
    })
   },[dispacth, id, order])
  return (
    <>
   
    <div className="w-screen min-h-full bg-gray-100 flex items-center justify-center py-10">
   
    <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8">
    <Link to={'/admin/'} className='btn' >{"<="}</Link>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Order Information</h3>
        <div className="mt-3 space-y-2 text-gray-600">
        <p><span className="font-medium">User:</span> {order?.userId?.username}</p>
          <p><span className="font-medium">Order Number:</span> {order?.orderId}</p>
          <p><span className="font-medium">Date:</span> {order?.parchasedate}</p>
          <p><span className="font-medium">Status:</span> {order?.status}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Items</h3>
        <div className="mt-4 space-y-4">
          {order?.productId?.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center shadow-sm">
              <img src={item?.image} alt={item?.title} className="w-20 h-20 object-cover rounded-lg mr-4"/>
              <div>
                <p className="text-lg font-medium text-gray-800">{item?.title}</p>
                <p className="text-gray-600">Quantity: {item?.qnt}</p>
                <p className="text-gray-600">Price: ₹ {item?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700">Total Cost</h3>
        <p className="mt-2 text-2xl font-bold text-gray-800">₹ {order?.totalprice}</p>
      </div>
    </div>
  </div>
  </>
  );
};

export default OrderDetails;
