import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetProducts, GetUsers } from '../../../Redux/ApiSlice/Tunk/Tunk'

function Navbar() {
  const dispacth = useDispatch()
  useEffect(()=>{
    dispacth(GetProducts())
    dispacth(GetUsers())
  })
  return (
    // <div>
    //   <div className="navbar bg-base-100">
    //     <div className="navbar-start">
    //       <a className="btn btn-ghost text-xl">SHOEPRO</a>
    //     </div>
    //     <div className="navbar-center hidden lg:flex">
    //       <ul className="menu menu-horizontal px-1">
    //         <li><Link to={"/admin/userslist"}>Users</Link></li>
    //         <li><Link to={"/admin"}>Product</Link></li>
    //         <li><Link to={"/admin/post"}>Add Products</Link></li>
    //       </ul>
    //     </div>
    //     <div className="navbar-end gap-2">
    //       <Link to={'/'} className='btn btn-primary'>Go the web</Link>
    //       <Link onClick={() => localStorage.clear()} to={'/login'} className='btn btn-primary '>Log out</Link>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 shadow">Profile</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 shadow">Logout</button>
      </div>
    </div>
  </div>
  )
}

export default Navbar