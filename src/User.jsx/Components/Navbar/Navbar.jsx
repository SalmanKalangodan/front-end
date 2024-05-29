import {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'

import { useDispatch, useSelector } from 'react-redux'
import { Search, Category , Cart} from '../../../Redux/SearchSlice/SearchSlice'
import { GetProducts, GetProfile, GetUserId, GetUsers, GetWishlist, Getcart, Getusers } from '../../../Redux/ApiSlice/Tunk/Tunk'
import Example from '../Pro/Example'






function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const login = localStorage.getItem('token')
  const [cartlength , setCartLength] = useState(0)
  const dispatch = useDispatch()
  const userId = useSelector((state)=>state.ApiSlice.userId)
  const name = localStorage.getItem('username')
  const cart =userId.Cart
  const Navigate = useNavigate()
  const [profile , setProfile] = useState() 
  const [wishlength , setWishlist] = useState(0)

  useEffect(() => {
    dispatch(GetProducts())
    dispatch(GetUsers())
    dispatch(GetProfile()).then((res)=>{
      setProfile(res.payload.profileimg);
    })
    dispatch(Getcart()).then((res)=>{
      if(res.payload.length !==0){
        setCartLength(res.payload.length)
      }
      
    })

    dispatch(GetWishlist()).then((res)=>{
      setWishlist(res.payload.length);
    })
  },[cartlength , profile, wishlength])
 
  
  const Logout = () => {
    localStorage.clear()
    navigate('/')
  }
  const HandleCategory = (categorys) => {
    dispatch(Category(categorys))
    navigate('/category')
  }
  const HandleSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(Search(search))
      navigate('/search')
    }

  }
  const HandleCart =()=>{
    dispatch(Cart(true))
  }

  const HandleWishlist = ()=>{
    navigate('/wishlist')
  }
  
  const HandleAdmin = () =>{
    Navigate('/admin/login')
  }
  return (
    <>
    <Example />
    <div className='flex navbar bg-base-100 gap-2'>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a> category </a></li>
            <li><a onClick={() => HandleCategory("men")}>Men</a></li>
            <li><a onClick={() => HandleCategory("women")}>Women</a></li>
            <li><a onClick={() => HandleCategory("kids")}>Kids</a></li>
          </ul>
        </div>
        <Link to={"/"}> <a className="btn btn-ghost text-xl" onDoubleClick={HandleAdmin}>SHOEPRO</a></Link>
      </div>

      <div className="navbar-end  ">

        <div className="flex gap-2 ">
          <div className="form-control mt-2">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" onChange={(e) => setSearch(e.target.value)} onKeyDown={HandleSearch} />
          </div>

          <div className="flex">
            {{
              ...login  ? <div className="dropdown dropdown-end mt-2" >
                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                   <div className="indicator" onClick={()=>HandleWishlist()}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                   </svg>
                    <span className="badge badge-sm indicator-item">{wishlength}</span>
                  </div>
                </div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                   <div className="indicator" onClick={()=>HandleCart()}>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">{cartlength}</span>
                  </div>
                </div>

              </div > : <div></div>
            }}

            {{
              ...login  ?<div className="dropdown dropdown-end mt-2" >
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10  rounded-full">
                  <img alt="Tailwind CSS Navbar component" src= {profile || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    {name}
                  </a>
                </li>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><a>Orders</a></li>
                <li onClick={Logout}><a>Logout</a></li>
              </ul>
            </div>
                : <div className='flex mt-2 gap-1'>
                  <Link to={'/login'}><button className="btn btn-active btn-primary  ">Login</button></Link>
                  <Link to={'/sign'}> <button className="btn btn-active btn-primary ">Sign Up</button></Link>
                </div>
            }}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar