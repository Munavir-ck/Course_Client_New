import {createSlice} from "@reduxjs/toolkit"

const studentSlice=createSlice({
   name: "student",
   initialState:{
    name: null,
    email:null,
    _id:null,
    image:null,
    isLoggedIn: false,
    token:null
   },
   reducers:{
    setStudent: (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.image=action.payload.image;
        state._id=action.payload._id
        state.isLoggedIn = true;
        state.token=action.payload.token
      },
      resetStudent: (state) => {
         state.name = null;
         state.email = null;
         state._id = null;
         state.isLoggedIn = false;
         state.image=null
         state.token=null
       },
   }




})
export const { setStudent, resetStudent}  = studentSlice.actions;
export const studentReducer= studentSlice.reducer;