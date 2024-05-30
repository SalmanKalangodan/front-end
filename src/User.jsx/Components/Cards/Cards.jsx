import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Cards.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts, PostWishlist } from '../../../Redux/ApiSlice/Tunk/Tunk'

function Cards() {
  const dispacth = useDispatch()
  const [data, setData] = useState([])
  // const data =useSelector((state)=>state.ApiSlice.data)
  useEffect(() => {
    dispacth(GetProducts()).then((res)=>{
      setData(res.payload)
    })
  }, [])
  
 
  return (
    <>
  
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {data?.map((product) => {
          return (
            <a key={product.id} href={product.href} className="group">
              <Link to={`/product/${product._id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">MRP : ₹ {product.price}</p>
            
            </Link>
            
          </a>
          )
        })}
      </div>
      </div>
      
    </>
  )
}

export default Cards