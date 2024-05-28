import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../Context/CartContext'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import './SearchItem.css'
import { Form, Link, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import  './SearchItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts } from '../../../Redux/ApiSlice/Tunk/Tunk'

function SearchItems() {
const [state ,setState] =useState()
const dispacth = useDispatch()
const navigate =useNavigate()
const data =useSelector((state)=>state)
const searchd= data.SearchSlice.Searchs.toLowerCase()

useEffect(()=>{
   dispacth(GetProducts()).then((res)=>{
    setState(res.payload)
   })
},[])
  return (
    <div>
    <Navbar />
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    {state&&state.map((value ,index)=>{
       if(value.title.toLowerCase().includes(searchd)||value.category.includes(searchd)){
         return(
          <a key={value._id} href={value.href} className="group">
          <Link to={`/product/${value._id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={value.image}
            alt={value.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{value.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">MRP : ₹ {value.price}</p>
        
        </Link>
        
      </a>
         )
       }
    })}
    </div>
    </div>
    <Footer />
    
    </div>
  )
}

export default SearchItems