import {createSlice} from "@reduxjs/toolkit"

const adminSlice=createSlice({
   name: "admin",
   initialState:{
    isLoggedIn: false,
    token:null
   },
   reducers:{
    setAdmin: (state, action) => {     
        state.isLoggedIn = true;
        state.token=action.payload.token
      },
   }




})
export const {setAdmin}  =adminSlice.actions;
export const adminReducer= adminSlice.reducer;