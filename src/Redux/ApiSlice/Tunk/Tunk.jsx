/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminapi, baseurl, userapi } from "../../../util/baseurl";
import consfig, { userConfig } from "../../../util/token";
import adminconsfig, { adminheader } from "../../../util/admintoken";
import toast, { Toaster } from "react-hot-toast";



//Get All Products 
export const GetProducts= createAsyncThunk("GetItem" , async ()=>{
    const ref=  await axios.get(`https://shoepro-backend-9mnj.onrender.com/api/user/products`);
        return ref.data
})
//Get All Users

//Get User With Using Id 

//Post Users In Registraion
// export const PostUser = createAsyncThunk('Postuser', async (formData)=>{
//     await axios.post(`http://localhost:3000/users`,formData ).then(alert('success'))
// })


//Get Products Using Id 
export const GetProductsId =createAsyncThunk('GetProductsId' , async (Pid)=>{
      const ref = await axios.get(`${baseurl+userapi}/products/${Pid}`)
      return ref.data
})

//==========================================================//===========================//=====================//===============//==========//====//


//reqister user

// eslint-disable-next-line react-refresh/only-export-components
export const userRegistration = createAsyncThunk('userRegistration' , async (formData) => {
     try {
        const Register =await axios.post(`${baseurl+userapi}/register` ,formData)
        toast.success(Register.data)
        return Register.data
     } catch (error) {
        console.log(error.response.data.message);
       error.response.data? toast.error(error.response.data) :toast.error(error.response.data.message)
     }
})


// user login 


export const userLogin = createAsyncThunk('userLogin' , async (formData) =>{
    try {
     await axios.post(`${baseurl+userapi}/login`, formData).then((res)=>{
            console.log(res);
            localStorage.setItem('token', res.data.token) 
            localStorage.setItem('refresh_token' , res.data.refreshToken)
            localStorage.setItem('username' , res.data.username)
            toast.success(res.data.message) 
            
        })
     
    
    } catch (error) {
        error.response.data? toast.error(error.response.data) : toast.error(error.response.data.message)
    }
})


// add cart 

export const addcart = createAsyncThunk('addcart', async (data) => {
    try {
      const response = await axios.post(`${baseurl+userapi}/${data.id}/cart`, {size:data.sizeId}, consfig);
      toast.success(response.data)
      return response.data; // Return the response data
    } catch (error) {
      toast.error(error.response.data);
      throw error; // Throw the error to be handled by the component
    }
  });
  
  // get cart 

  export const Getcart = createAsyncThunk('Getcart' , async ()=>{
    try {
        const res = await axios.get(`${baseurl+userapi}/cart` , consfig)
        return res.data
    } catch (error) {
        // toast.error(error.response.data);
    }
  })


  //admin login 

 export const Adminlogin = createAsyncThunk('adminLogin' , async(formData)=>{
   try {
    await axios.post(`${baseurl+adminapi}/login`,formData).then((res)=>{
        localStorage.setItem('admintoken',res.data.token)
        toast.success(res.data.messasge)
    })
   } catch (error) {
    // toast.error(error.message)
   }
 })  

 // add products   

 export const addProducts = createAsyncThunk ('addproduct' , async(formdata)=>{
    try {
        await axios.post(`${baseurl+adminapi}/products`,formdata ,adminconsfig ).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })
// remove cart
 export const DeleteCart = createAsyncThunk('deletCart' , async (productId)=>{
    try {
        await axios.delete(`${baseurl+userapi}/${productId}/cart`,consfig).then((res)=>{
           toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 // add size and cart 

 export const AddSizeAndStock = createAsyncThunk('addsize' , async(id)=>{
    try {
        await axios.post(`${baseurl+adminapi}/products/size/${id.id}`,id.data,adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 // update stock
 export const UpdateStock = createAsyncThunk('UpdateStock' , async(data)=>{
    try {
        await axios.patch(`${baseurl+adminapi}/products/stock/${data.id}`,{stock :data.updateStock},adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);   
    }
   
 })

// delete size
 export const deleteSize = createAsyncThunk('deleteSize' , async(id)=>{
    try {
        await axios.delete(`${baseurl+adminapi}/products/stock/${id}`,adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 // post address 

 export const AddAddress = createAsyncThunk('AddAddress' , async (data)=>{
    try {
        await axios.post(`${baseurl+userapi}/address`, data, consfig).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.success(error.response.data);
    }
 })


 // payment 

 export const Payment = createAsyncThunk('payment' , async()=>{
    try {
        await axios.post(`${baseurl+userapi}/payment`,{},consfig).then((res)=>{
            const url = res.data.url
            const conformation =window.confirm('conform the payment')
            if(conformation){
                window.location.replace(url)
            }
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const GetAddress = createAsyncThunk('GetAddress' , async ()=>{
    try {
       const res = await axios.get(`${baseurl+userapi}/address`,consfig)
            return res.data
        
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const SetDefualtAddress = createAsyncThunk('setDefault', async(id)=>{
    try {
        await axios.put(`${baseurl+userapi}/${id}/address`,{},consfig).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const DeleteAddress = createAsyncThunk('deleteAddress' , async (id)=>{
    try {
        await axios.delete(`${baseurl+userapi}/${id}/address` ,consfig).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const PaymentSuccess = createAsyncThunk('paymentSuccess' , async () =>{
    try {
       const res = await axios.get(`${baseurl+userapi}/payment/success` , consfig)
      
       return res.data
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data);
    }
 })


 export const Editproduct = createAsyncThunk('editproduct' , async (data)=>{
    try {
        await axios.put(`${baseurl+adminapi}/products/${data.id}`,data.data,adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        //  toast.error(error.response.data);
    }
 })


 export const DeleteProduct = createAsyncThunk('delete' , async (id) =>{
    try {
        await axios.delete(`${baseurl+adminapi}/products/${id}`,adminheader).then((res)=>{
            toast.success(res.data)
        })
       
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 export const Getusers = createAsyncThunk('getusers' , async ()=>{
    try {
       const res=   await axios.get(`${baseurl+adminapi}/users`,adminheader)
       return res.data
    } catch (error) {
        //  toast.error(error.response.data);   
    }
 })


 export const BlockUsers = createAsyncThunk('blockuser' , async (id)=>{
    try {
        await axios.patch(`${baseurl+adminapi}/user/${id}`,{},adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 export const AdminProducts = createAsyncThunk('adminProducts' , async ()=>{
    try {
       const res=  await axios.get(`${baseurl+adminapi}/products`,adminheader)
       return res.data
    } catch (error) {
        // toast.error(error.response.data);
    }
 })



 export const HideProduct = createAsyncThunk('hideProduct' , async (id)=>{
    try {
        await axios.patch(`${baseurl+adminapi}/products/hide/${id}`,{},adminheader).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        //  toast.error(error.response.data);
    }
 })



 export const AdminOrder = createAsyncThunk('AdminOrders' , async ()=>{
    try {
       const res =  await axios.get(`${baseurl+adminapi}/orders`,adminheader)
         return res.data
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data);
    }
 })


 export const GetWishlist =createAsyncThunk('getproducts' ,async ()=>{
    try {
        const res =  await axios.get(`${baseurl+userapi}/wishlists`,consfig)
        return res.data
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const PostWishlist = createAsyncThunk('postWishlist' , async (data)=>{
    try {
      
        await axios.post(`${baseurl+userapi}/${data.id}/wishlists`,{size : data.selectedSize._id},consfig).then((res)=>{
            // toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const DeleteWishlist =  createAsyncThunk('DeleteWhislist' , async (id)=>{
    try {
        await axios.delete(`${baseurl+userapi}/${id}/wishlists`,consfig).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const GetSales = createAsyncThunk('GetProducts' , async ()=>{
    try {
        const res = await axios.get(`${baseurl+adminapi}/sales/weeklysales`,adminheader)
        return res.data
        
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const GetTotel = createAsyncThunk('GetProducts' , async ()=>{
    try {
        const res = await axios.get(`${baseurl+adminapi}/sales/report`,adminheader)
        return res.data
        
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 export const CartIncrement = createAsyncThunk('cartIncrement' , async (id) =>{
    try {
        await axios.put(`${baseurl+userapi}/cart/increment/${id}`,{},consfig).then((res)=>{
            // toast.success(res.data)
        })
    } catch (error) {
        // toast.error(error.response.data);
    }
 })

 export const CartDecrement = createAsyncThunk('cartdetcrement' , async (id) =>{
    try {
        await axios.put(`${baseurl+userapi}/cart/decrement/${id}`,{},consfig).then((res)=>{
            // toast.success(res.data.message)
        })
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data);
    }
 })


 export const CartTotal = createAsyncThunk('cartTotal' , async()=>{
    try {
        const res = await axios.get(`${baseurl+userapi}/cart/total`,consfig)
        return res.data
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 export const GetProfile = createAsyncThunk('getProfile' , async ()=>{
    try {
        const res = await axios.get(`${baseurl+userapi}/profile`,consfig)
        return res.data
    } catch (error) {
        // toast.error(error.response.data);
    }
 })


 export const EditProfile = createAsyncThunk('EditeProfile' , async (formdata)=>{
    try {
        await axios.put(`${baseurl+userapi}/profile/edit`,formdata,userConfig).then((res)=>{
            toast.success(res.data)
        })
    } catch (error) {
        toast.error(error);
    }
 })


 export const GetUserOrders = createAsyncThunk('GetuserOrders', async ()=>{
    try {
        const res = await axios.get(`${baseurl+userapi}/order`,consfig)
        return res.data
    } catch (error) {
        console.log(error);
    }
 })

 export const GetSingleOrders = createAsyncThunk('GetSingleOrders' , async (id)=>{
    try {
        const res = await axios.get(`${baseurl+adminapi}/orders/${id}` , adminheader)
        return res.data
    } catch (error) {
     console.log(error);   
    }
 })