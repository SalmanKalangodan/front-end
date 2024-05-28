import { createSlice } from "@reduxjs/toolkit";
import { userRegistration } from "../Tunk/Tunk";





const registerSlice = createSlice({
    name: 'register',
    initialState:{
        data : null,
        error: null
    },
    extraReducers : (builder) =>{
        //registration
        builder.addCase(userRegistration.fulfilled, (state , action)=>{
            state.data = action.payload
            console.log(action);
        })
        builder.addCase(userRegistration.rejected , (state , action)=>{
            state.data = null,
            state.error = action.payload
            console.log(action);
        })
    } 
})

export default registerSlice.reducer