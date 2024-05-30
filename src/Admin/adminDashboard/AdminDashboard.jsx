import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Ensure this import is present to avoid potential issues
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Home from '../Home/Home';
import UsersList from '../Components/UsersList/UsersList';
import Post from '../Components/Post/Post';
import { useDispatch } from 'react-redux';
import {  AdminOrder, AdminProducts, GetSales, GetTotel, Getusers } from '../../Redux/ApiSlice/Tunk/Tunk';
import AdminOrders from '../Components/Orders/Orrders';
import { useNavigate } from 'react-router-dom';




const AdminDashboard = () => {

  const dispacth = useDispatch()
  const [open ,setOpen] = useState(false)
  const [nav , setNav]  = useState('')
  const [users , setUsers] = useState([])
  const [products , setProducts] = useState([])
  const [sales , setSales] = useState([])
  const [salesData , setSalesData] =useState()
  const [orders , setOrders] =useState([])
  const Navigate = useNavigate()
 useEffect(()=>{
  dispacth(Getusers()).then((res)=>{
   setUsers(res.payload)
  })
  dispacth(AdminProducts()).then((res)=>{
    setProducts(res.payload)
  })

  dispacth(GetSales()).then((res)=>{
    
    setSalesData(res.payload)
  })

  dispacth(GetTotel()).then((res)=>{
    setSales(res.payload)
  })

  dispacth(AdminOrder()).then((res)=>{
    setOrders(res.payload)
    
  })

 },[orders,salesData,sales,products,users,nav,open,dispacth])

 const HandleLogout = () =>{
  localStorage.clear()
  Navigate('/admin/login')
 }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {open ===true ? <>  <div className="w-64 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 p-6">
        <a  className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>setNav('')}>Dashboard</a>
        <a className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>setNav('Users')}>Users</a>
        <a className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>setNav('products')}>Products</a>
        <a className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>setNav('addpro')}>Add Products</a>
        <a className="block py-2 px-4 rounded hover:bg-indigo-700" onClick={()=>setNav('orders')}>Orders</a>
        <a className="block py-2 px-4 rounded hover:bg-indigo-700">Settings</a>
      </nav>
    </div></> : null}
      <div className="flex-1 flex flex-col">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 shadow" onClick={()=>HandleLogout()}>Logout</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 shadow flex items-center " onClick={()=>setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} className="text-xl" />
            <span className="ml-2">Menu</span>
          </button>
        </div>
      </div>
    </div>
        <main className="p-6">
          {nav === '' ?<><h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <DashboardCard title="Total Users" count={users?.length} bgColor="bg-blue-500" />
            <DashboardCard title="Total Products" count={products?.length} bgColor="bg-green-500" />
            <DashboardCard title="Out of Stock" count={products?.filter(p => p.stock === 0).length} bgColor="bg-red-500" />
            <DashboardCard title="Total Sales" count={sales?.total?.total_revenue} bgColor="bg-yellow-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <SalesReportChart salesData={salesData} />
            <OrdersTable orders={orders} />
          </div></> : nav === 'products' ? <Home /> : nav === 'Users' ? <UsersList /> :nav === 'addpro' ? <Post />: nav === 'orders'? <AdminOrders />: null}
          
        </main>
      </div>
    </div>
  );
};



// const Navbar = () => (
//   <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
//     <div className="p-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//       <div className="flex items-center space-x-4">
//         <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 shadow">Profile</button>
//         <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 shadow">Logout</button>
//       </div>
//     </div>
//   </div>
// );

const DashboardCard = ({ title, count, bgColor }) => (
  <div className={`${bgColor} text-white shadow-md rounded-lg p-6`}>
    <h2 className="text-lg font-bold">{title}</h2>
    <p className="text-3xl">{count}</p>
  </div>
);

// eslint-disable-next-line react/prop-types
const SalesReportChart = ({salesData}) => {
  const data = {
    labels: ['week 1' , 'week 2', 'week3' , 'week4' , 'week5' , 'week6' , 'week7'], // Use week labels from salesData
    datasets: [
      {
        label: 'Total Revenue',
        data: salesData?.map(week => week.total_revenue),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Total Quantity Sold',
        data: salesData?.map(week => week.total_sell_qnt),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-96">
      <h2 className="text-lg font-bold mb-4">Weekly Sales Report</h2>
      <div className="relative h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

const OrdersTable = ({ orders }) => (
  
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Customer</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Total</th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {orders?.map(order => (
            <tr key={order.id} className="border-b">
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{order?.userId.username}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5"> ₹ {order?.totalprice}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;
