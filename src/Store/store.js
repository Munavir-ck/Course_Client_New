import { configureStore} from  "@reduxjs/toolkit"
import {studentReducer} from './Slice/student_slice';
import { tutorReducer } from "./Slice/tutorSlice";
import { roomReducer } from "./Slice/socketSlice"; 
import {teacherReducer} from  "./Slice/teacherSlice"
import { studentIdReducer } from "./Slice/studentIdSlice";



import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from 'redux-persist/lib/storage';
import { adminReducer } from "./Slice/admin_slice";

  const persistConfigStudent = { key:"student", storage, version: 1 }; 
  const persistConfigTutor = { key:"tutor", storage, version: 1 };   
  const persistRoomReducer={key:"room",storage,version:1}
  const persistTeacherReducer={key:"teacher",storage,version:1}
  const persistStudentIdReducer={key:"studentId",storage,version:1}
  const persistConfigAdmin ={key:"admin",storage,version:1}


  const studentIdPersistReducer=persistReducer(
    persistStudentIdReducer,
    studentIdReducer
   )


  const teacherPersistedReducer=persistReducer(
    persistTeacherReducer,
    teacherReducer
   )

 const roomPersistedReducer=persistReducer(
  persistRoomReducer,
  roomReducer
 )
  const studentPersistedReducer=persistReducer(
    persistConfigStudent,
    studentReducer
  )    

  const tutorPersistedReducer=persistReducer(
    persistConfigTutor,
    tutorReducer
  )

  const adminPersistedReducer=persistReducer(
    persistConfigAdmin,
    adminReducer
  )

export const store = configureStore({
    reducer: {
      student: studentPersistedReducer,
      tutor: tutorPersistedReducer,
      room:roomPersistedReducer,
      teacher:teacherPersistedReducer,
      studentId:studentIdPersistReducer,
      admin:adminPersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  
  export const  jhfawesgd=persistStore(store)