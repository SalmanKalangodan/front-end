import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteWishlist, GetWishlist } from '../../../Redux/ApiSlice/Tunk/Tunk';
import Navbar from '../Navbar/Navbar';




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
    <div className="p-4">
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
    </div>
    </>
  );
}

export default Wishlist;
