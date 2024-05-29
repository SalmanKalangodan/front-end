import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminProducts, DeleteProduct,  HideProduct } from '../../Redux/ApiSlice/Tunk/Tunk';


function Home() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products , setProducts] = useState([])
  useEffect(() => {
    dispatch(AdminProducts()).then((res)=>{
      setProducts(res.payload)
    })
    
  }, [products]);
//  const products = useSelector((state)=>state.ApiSlice.data)

  const handleAddSize = (id) => {
    navigate(`admin/product/${id}`)
  };

  const handleDelete = (id) => {
    dispatch(DeleteProduct(id))
  };

  const HandleHide = (id) =>{
    dispatch(HideProduct(id))
  }

  return (
    <div className="theme-container">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold ">All Products</h2>
        </div>
        <div className="table-responsive overflow-x-auto rounded-lg shadow"> {/* Responsive table container */}
          <table className="table w-full text-sm text-left table-striped"> {/* Basic table structure */}
            <thead>
              <tr className="text-xs font-semibold text-gray-700 bg-gray-100"> {/* Header row */}
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-200"> {/* Row styling on hover */}
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3 text-gray-600">{product.description.substring(0, 50)}...</td> {/* Truncate description for space */}
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddSize(product._id)}
                      >
                        Edit
                      </button>
                     {product.isHide === false ? <button
                        className="btn btn-sm btn-primary"
                        onClick={() => HandleHide(product._id)}
                      >
                        Hide
                      </button> :<button
                        className="btn btn-sm btn-primary"
                        onClick={() => HandleHide(product._id)}
                      >
                        unHide
                      </button> } 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;




