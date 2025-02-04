import {createSlice} from "@reduxjs/toolkit"

const tutorSlice=createSlice({
   name: "tutor",
   initialState:{
    name: null,
    email:null,
    _id:null,
    isLoggedIn: false,
    token:null
   },
   reducers:{
    setTutor: (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.tutor_id=action.payload.tutor_id
        state.isLoggedIn = true;
        state.token=action.payload.token
      },
   }




})
export const { setTutor}  =tutorSlice.actions;
export const tutorReducer= tutorSlice.reducer;