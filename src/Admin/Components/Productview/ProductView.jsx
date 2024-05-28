import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddSizeAndStock, GetProductsId, UpdateStock, deleteSize } from '../../../Redux/ApiSlice/Tunk/Tunk';
import { Link, useParams } from 'react-router-dom';

function ProductView() {
  const [size, setSize] = useState('');
  const [stock, setStock] = useState('');
  const [updateStock , setUpdateStock] = useState()
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value , setValue] = useState(false)
  const [render , setRender] = useState(false)
  const [product , setProduct] = useState([])
  const dispacth = useDispatch()
  const {id} = useParams()
  useEffect(() => {
    dispacth(GetProductsId(id)).then((res)=>{
        setProduct(res.payload);
    })
  },[product])
//   const product =useSelector(  (state) => state.ApiSlice.ProductId)
  const handleAddSize = async () => {
    setRender(!render)
    setLoading(true);
    try {
        const data = {
            size , 
            stock
        }
        dispacth(AddSizeAndStock({id , data}))
    } catch (error) {
      console.error('Error adding size:', error);
      setMessage('Error adding size. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const HandleDelete = async (sizeId) => {
     dispacth(deleteSize(sizeId))
    console.log(`Editing stock for sizeId: ${sizeId}`);
  };

  const handleUpdateStock = async (id) => {
    setRender(!render)
    setValue(false)
    dispacth(UpdateStock({id , updateStock}))
  
    
    console.log('Updating overall stock for product:');
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-full overflow-y-auto">
        <div className="w-1/4 mx-auto mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
        <p className="text-lg text-gray-700 mb-4">Current Price: ${product.price}</p>
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
    <Link to={`/admin/edit/${product._id}`}><button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-blue-600">edit</button></Link> 
        <h3 className="text-xl font-semibold mb-2">Sizes & Stock</h3>
        {product?.sizes?.map((size) => (
          <div key={size._id} className="flex items-center justify-between mb-2">
            <p className="text-lg">{size.size}</p>
           {value !== size._id  ?<><p className="text-lg">Stock: {size.stock}</p>   <button
              onClick={() => setValue(size._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update Stock
            </button><button
              onClick={() => HandleDelete(size._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-blue-600"
            >
              Delete Size
            </button></> : <><label>stock : {size.stock}</label><input type='number' className="w- px-4 py-2 border-t border-r border-b border-l border-gray-300 rounded-r rounded-l focus:outline-none focus:border-blue-500" value={updateStock}  onChange={(e)=>setUpdateStock(e.target.value)} placeholder='updateStock'/>   <button
              onClick={() => handleUpdateStock(size._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update Stock
            </button></>} 
         
          </div>
        ))}
        <div className="flex items-center mt-6">
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-1/3 px-4 py-2 border-t border-r border-b border-gray-300 rounded-r focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddSize}
            disabled={loading || !size || !stock}
            className={`w-1/3 px-4 py-2 bg-green-500 text-white rounded-l-none hover:bg-green-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {loading ? 'Adding...' : 'Add Size'}
          </button>
        </div>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ProductView;
