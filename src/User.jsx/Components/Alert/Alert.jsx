// src/components/SuccessAlert.jsx
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const SuccessAlert = ({message}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    },3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="fixed top-20 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg animate-slide-in">
      <FaCheckCircle className="text-green-500 mr-2" />
      <span>{message}</span>
      <button
        className="ml-auto text-green-700 hover:text-green-900"
        onClick={handleClose}
      >
       {"   ×"} 
      </button>
    </div>
  );
};

export default SuccessAlert;
