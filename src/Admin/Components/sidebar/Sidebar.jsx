import React from "react"
import { useNavigate } from "react-router-dom"





function Sidebar  (){

const Navigate =useNavigate()





   return(
    <div className="w-64 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 p-6">
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-700">Dashboard</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-700">Users</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>Navigate('/admin/products')}>Products</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-700">Orders</a>
        <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-700">Settings</a>
      </nav>
    </div>
   )
}

export default Sidebar