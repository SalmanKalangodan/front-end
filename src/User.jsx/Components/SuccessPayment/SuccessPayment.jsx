import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { PaymentSuccess } from "../../../Redux/ApiSlice/Tunk/Tunk";
import toast from "react-hot-toast";

function SuccessPayment() {
  const navigate = useNavigate();
  const dispacth = useDispatch()
  const [data ,setData] =useState({})
  useEffect(() => {
   

    
    
         dispacth(PaymentSuccess()).then((res)=>{
            if (res.status === 200 && isSuccess) {
                setData(res.payload[0])
              }
         })
        
    
    


  }, [dispacth, data]); // Include navigate in the dependency array
 console.log(data);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-sm text-gray-600">Thank you for your purchase.</p>
        <p className="mt-2 text-sm text-gray-600">Order ID: <span className="font-medium">{data.orderId}</span></p>
        <p className="mt-2 text-sm text-gray-600">Amount Paid: <span className="font-medium">₹ {data.amount}</span></p>
        <div className="mt-6 w-full">
          <Link to="/" className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Go to Home
          </Link>
          {/* <Link to={`/order/${order}`} className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            View Order Details
          </Link> */}
        </div>
      </div>
    </div>
  </div>
  );
}

export default SuccessPayment;