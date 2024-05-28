import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddSizeAndStock } from '../../Redux/ApiSlice/Tunk/Tunk';

function AddSizeStock({ productId }) {
  const [size, setSize] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  const dispacth = useDispatch()
  const handleAddSizeStock = async () => {
    const data = {
      size,
      stock
    }
    dispacth(AddSizeAndStock({id , data}))
    // setLoading(true);
    // try {
    //   const response = await axios.post(`/api/products/addsize/${productId}`, { size, stock });
    //   setMessage(response.data);
    // } catch (error) {
    //   console.error('Error adding size and stock:', error);
    //   setMessage('Error adding size and stock. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
    <Navbar />
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Size and Stock</h2>
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-bold mb-2">Size</label>
          <input
            type="text"
            id="size"
            className="bg-gray-800 text-white border-b-2 border-gray-600 py-2 px-3 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-bold mb-2">Stock</label>
          <input
            type="number"
            id="stock"
            className="bg-gray-800 text-white border-b-2 border-gray-600 py-2 px-3 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleAddSizeStock}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Size and Stock'}
          </button>
        </div>
        {message && <p className="text-green-500 text-xs italic mt-2">{message}</p>}
      </div>
    </div>
    </>
  );
}

export default AddSizeStock;


