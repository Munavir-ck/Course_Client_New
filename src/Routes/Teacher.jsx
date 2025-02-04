import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TutorHome from "../pages/Tutor/TutorHome";
import TeacherLogin from "../Components/Tutor/TeacherLogin";
import TutorProfilePage from "../pages/Tutor/TutorProfilePage";
import Time_managePage from "../pages/Tutor/Time_managePage";
import BookingList_page from "../pages/Tutor/BookingList_page";
import ChatRoomTutorPage from "../pages/Tutor/ChatRoomPage";

import ErrorPage from '../Components/Admin/ErrorPage/ErrorPage';
import RoomPage from "../Components/screen/Room";
import { useSelector } from 'react-redux'


function Teacher() {



  const teacherToken =3333

  return (
    <>
      <Routes>
        <Route  path="/" element={ <TeacherLogin />} />

        <Route path="/home" element={teacherToken?<TutorHome />:<Navigate to={"/tutor"}/>} />
        <Route  path="/profile" element={teacherToken?<TutorProfilePage />:<Navigate to={"/tutor"}/> } />

        <Route path="/manage_time" element={teacherToken? <Time_managePage />:<Navigate to={"/tutor"}/>} />
        <Route path="/booking_list" element={teacherToken?<BookingList_page />:<Navigate to={"/tutor"}/>} />
        <Route path="/room/:roomId" element={ <RoomPage />} />
        <Route path="/chat_room_tutor/:id" element={teacherToken?<ChatRoomTutorPage />:<Navigate to={"/tutor"}/>} />
        <Route path="/*"  element={<ErrorPage link={"/tutor/home"} />} />
      </Routes>
    </>
  );
}

export default Teacher;

