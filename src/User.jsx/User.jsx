import { useState } from 'react'
import { Route ,Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Sign from './Pages/Sign/Sign'
import Home from './Pages/Home/Home'
import Product from './Components/Product/Product'
import { Cartcontext } from './Context/CartContext'
import SearchItems from './Components/SearchComponent/SearchItems'
import Admin from '../Admin/Admin'
import Catagory from './Components/Category/Catagory'
import Payment from './Components/Payment/Payment'
import AdminLogin from '../Admin/adminLogin/adminLogin'
import AddressCard from './Components/Address/AddressCard'
import SuccessPayment from './Components/SuccessPayment/SuccessPayment'
import Wishlist from './Components/Wishlisht/Wishlist'
import ProfileEdit from './Components/ProfileEdit/ProfileEdit'
import ProfileView from './Components/Profile/Profile'

function User() {
  const [search ,setSearch] =useState("")
  const [count,setCount] =useState(1)
  const [prid , SetPrid] =useState()
  const [category,setCategory] =useState("")

  return (
    <>
    <Cartcontext.Provider value={{search , setSearch , count ,setCount , prid ,SetPrid,category,setCategory}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign' element={<Sign />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<Product />}/>
            {/* <Route path='/cart' element={<Cart />} /> */}
            <Route path='/search' element={<SearchItems />} />
            <Route path='/category' element={<Catagory />} />
            <Route path='/admin/*' element= {<Admin />} />
            <Route path='/payment' element= {<Payment />} />
            <Route path='/admin/login' element={<AdminLogin />}/>
            <Route path='/address' element={<AddressCard />}/>
            <Route path='/payment/success' element={<SuccessPayment />}/>
            <Route path='/wishlist' element={<Wishlist />}/>
            <Route path='/profile/edit' element={<ProfileEdit />}/>
            <Route path='/profile' element={<ProfileView />}/>
        </Routes>
        
        </Cartcontext.Provider>
        </>
  )
}


export default User