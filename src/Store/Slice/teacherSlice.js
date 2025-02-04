import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",

  initialState: {
    teacher_id: null,
  },
  reducers: {
    setTeacher: (state, action) => {
      state.teacher_id = action.payload.teacherId;
    },
  },
});
export const {setTeacher } = teacherSlice.actions;
export const teacherReducer =teacherSlice.reducer;