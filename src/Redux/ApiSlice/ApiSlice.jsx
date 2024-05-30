import { createSlice } from "@reduxjs/toolkit";
import { GetProducts, GetProductsId,  Getcart} from "./Tunk/Tunk";




export const ApiSlice = createSlice({
  name:"api",
  initialState:{
    data:[],  //All Products 
    users:[], //All Users
    userId:[],  //Logind User Details
    cart:[],  // Cart Item 
    ProductId:[] //Product with Id
  },
  extraReducers: (builder) => {
    //Get All Products 
      builder.addCase(GetProducts.fulfilled, (state, action) => {
        state.data = action.payload
      })
    // Get All Users 
     
    //Get User With Id
     
    //Add Products in Cart
      builder.addCase(Getcart.fulfilled,(state,action) =>{
          state.cart=action.payload
      })
    //Get Products With Id
      builder.addCase(GetProductsId.fulfilled,(state,action)=>{
          state.ProductId=action.payload
      })
    },
  
})
// export const {add} =ApiSlice.actions
export default ApiSlice.reducer