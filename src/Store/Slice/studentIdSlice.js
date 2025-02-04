import { createSlice } from "@reduxjs/toolkit";

const studentIdSlice = createSlice({
  name: "studentId",

  initialState: {
    student_Id: null,
  },
  reducers: {
    setStudentId: (state, action) => {
      state.student_Id = action.payload.studentId;
    },
  },
});
export const {setStudentId} = studentIdSlice.actions;
export const studentIdReducer =studentIdSlice.reducer;