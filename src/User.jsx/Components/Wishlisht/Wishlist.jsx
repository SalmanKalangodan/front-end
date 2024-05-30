import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteWishlist, GetWishlist } from '../../../Redux/ApiSlice/Tunk/Tunk';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';




function Wishlist() {

    const dispacth = useDispatch()
    const [data , setData] = useState([])
    useEffect(()=>{
       dispacth(GetWishlist()).then((res)=>{
           setData(res.payload)
           console.log(res);
       })
    },[data, dispacth])

    const HandleRemove = (id)=>{
        dispacth(DeleteWishlist(id))
    }

console.log(data);
  return (
    <>
    <Navbar />
    {/* <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={item.productId.image} alt={item.productId.title} className="w-full h-48 object-cover" />
            <div className="p-6 bg-white text-gray-800">
              <h3 className="text-xl font-semibold mb-2">{item.productId.title}</h3>
              <p className="mb-2">Price: <span className="font-bold">{item.productId.price}</span></p>
              <p className="mb-2">Size: <span className="font-bold">{item.size}</span></p>
              <p className="mb-4">Added on: <span className="font-bold">{item.Date}</span></p>
              <button className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 shadow-lg transition-colors" onClick={()=>HandleRemove(item.productId._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div> */}
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">

  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    {data?.map((product) => {
      return (
        <a key={product.id} href={product.href} className="group">
          <Link to={`/product/${product._id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.productId.image}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.productId.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">MRP : ₹ {product.productId.price}</p>
        
        </Link>
        <button className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 shadow-lg transition-colors" onClick={()=>HandleRemove(product.productId._id)}>Remove</button>
      </a>
      )
    })}
  </div>
  </div>
  

    </>
  );
}

export default Wishlist;
