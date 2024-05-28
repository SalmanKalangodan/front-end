import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'

function Catagory() {
  const category = useSelector((state) => state.SearchSlice.category)
  const state = useSelector((state) => state.ApiSlice.data)
  // const [state, setState] = useState([])
  useEffect(() => {
    // axios.get("http://localhost:3000/products").then((ref) => {
    //   setState(ref.data)
    // })
  }, [])
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {state && state.map((value, index) => {
          if (value.category.includes(category)) {
            return ( 
              // eslint-disable-next-line react/jsx-key
              
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
    </>
  )
}

export default Catagory