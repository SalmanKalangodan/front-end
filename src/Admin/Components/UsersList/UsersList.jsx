import  { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { BlockUsers, Getusers } from '../../../Redux/ApiSlice/Tunk/Tunk'
import Footer from '../Footer/Footer'

function UsersList() {
  const [users, setUsers] = useState([])
  const dispacth =useDispatch()
  // const users =useSelector((state)=>state.ApiSlice.users)
  useEffect(() => {
   dispacth(Getusers()).then((res)=>{
    setUsers(res.payload)
   })
  }, [dispacth, users])
  console.log(users);
  const HandleDelete = (value) => {
    dispacth(BlockUsers(value))
  
  }
  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 text-gray-600 tracking-wider"></th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 text-gray-600 tracking-wider">Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 text-gray-600 tracking-wider">Email</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 text-gray-600 tracking-wider">phone</th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 text-gray-600 tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users && users.map((value) => {
                if (value) {
                  return (
                    <tr key={value._id} className="border-b">
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                        {value.isDeleted !== true 
                          ? <button className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => HandleDelete(value._id)}>Block</button>
                          : <button className="btn btn-primary bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={() => HandleDelete(value._id)}>Unblock</button>}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{value.username}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{value.email}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{value.phone}</td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5"><button className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() =>(value)}>Details</button></td>
                    </tr>
                  )
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UsersList