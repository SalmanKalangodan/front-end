import { createSlice } from "@reduxjs/toolkit";
import { Getcart } from "../Tunk/Tunk";





const cartSlice = createSlice({
    name: 'getcart',
    initialState:{
        data : null,
        error: null
    },
    extraReducers : (builder) =>{
        //registration
        builder.addCase(Getcart.fulfilled, (state , action)=>{
            state.data = action.payload
        })
        builder.addCase(Getcart.rejected , (state , action)=>{
            state.data = null,
            state.error = action.payload
            
        })
    } 
})

export default cartSlice.reducer