import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "../SearchSlice/SearchSlice";
import ApiSlice from "../ApiSlice/ApiSlice";
import registration from "../ApiSlice/registration/registration";
import login from "../ApiSlice/login/login";
import getCart from "../ApiSlice/Getcart/getCart";
import AddressSlice from "../ApiSlice/Addressdata/AddressSlice";

export const store = configureStore({
    reducer:{
      SearchSlice,  //Search and Category Datas
      ApiSlice,  //All API Calls 
      registration,
      login,
      getCart,
      AddressSlice
    }
})