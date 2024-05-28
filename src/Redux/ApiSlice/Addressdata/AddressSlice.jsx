/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { GetAddress } from "../Tunk/Tunk";






const AddressSlice = createSlice({
    name: 'getAddress',
    initialState:{
        data : null,
        error: null
    },
    extraReducers : (builder) =>{
        //registration
        builder.addCase(GetAddress.fulfilled, (state , action)=>{
            state.data = action.payload
        })
        builder.addCase(GetAddress.rejected , (state , action)=>{
            state.data = null,
            state.error = action.payload
            
        })
    } 
})

export default AddressSlice.reducer