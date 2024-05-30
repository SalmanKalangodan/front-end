import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom'
import Post from './Components/Post/Post'
import UsersList from './Components/UsersList/UsersList'
import Edit from './Components/Edit/Edit'
import AddSizeStock from './Addsize/AddSizeStock'
import ProductView from './Components/Productview/ProductView'
import AdminDashboard from './adminDashboard/AdminDashboard'
import OrderDetails from './Components/Orderslist/Orders'




function Admin() {
  const admin = localStorage.getItem("admintoken")
  return (
    <div>
     
      {admin ? <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/products' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/userslist' element={<UsersList />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='admin/addsize/:id' element = {<AddSizeStock />} />
        <Route path='admin/product/:id' element = {<ProductView />} />
        <Route path='admin//orders/:id' element = {<OrderDetails />} />
      </Routes> : null}

    </div>
  )
}

export default Admin