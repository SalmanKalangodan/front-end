/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAddress, GetAddress, Payment, SetDefualtAddress } from '../../../Redux/ApiSlice/Tunk/Tunk';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';


const AddressCard = () => {
   const dispacth = useDispatch()
  const [addresses , setAddresses] = useState([])
  useEffect(()=>{
    dispacth(GetAddress()).then((res)=>{
      setAddresses(res.payload)
    })
  },[addresses])

  const HandleDefault = ({id ,e}) =>{
    e.preventDefault
    dispacth(SetDefualtAddress(id))
  }
 
  const HandleDelete = ({id , e})=>{
    e.preventDefault
    dispacth(dispacth(DeleteAddress(id)))
  }
  
  const HandleBuy = () =>{
      dispacth(Payment()).then((res)=>{
       
      })
  }
  return (
    <>
    <Nav2 />
   
    { addresses.length !== 21 ? addresses?.map((address, index) => (
    
        <div key={index} className="bg-white rounded-md shadow-md p-6 mb-6" >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 " >
            <h2 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4">{address.firstname} {address.lastname}</h2>
            <span   className={`inline-block px-2 py-1 text-xs font-semibold rounded-full  ${address.defaultaddress === true ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{address.defaultaddress === true ? 'Default' : 'Not Default'}</span>
          </div>
          <p className="text-gray-600 mb-2">{address.street},{address.city}, {address.state}, {address.country}, {address.pincode}</p>
          <div className="mt-2 flex flex-col md:flex-row items-start md:items-center justify-between">
           { address.defaultaddress !== true ? <><button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2 md:mt-0" onClick={(e)=>HandleDefault({id:address._id ,e})}>Select</button> <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-2 md:mt-0" onClick={(e)=>HandleDelete({e , id : address._id})}>Delete</button></>: null} 
            
          </div>
        </div>
      )):null }
    <div className="flex justify-center">
  <Link to={'/payment'}> <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2 md:mt-0">AddAddress</button></Link>
    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 ml-1 px-4 rounded-md mt-2 md:mt-0" onClick={HandleBuy}>Proceed to Buy</button>
</div>
   </>
  );
};

export default AddressCard;
