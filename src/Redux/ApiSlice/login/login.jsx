import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../Tunk/Tunk";





const loginSlice = createSlice({
    name: 'login',
    initialState:{
        data : null,
        error: null
    },
    extraReducers : (builder) =>{
        //registration
        builder.addCase(userLogin.fulfilled, (state , action)=>{
            state.data = action.payload
        })
        builder.addCase(userLogin.rejected , (state , action)=>{
            state.data = null,
            state.error = action.payload
            
        })
    } 
})

export default loginSlice.reducer