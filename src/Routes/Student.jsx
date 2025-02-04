import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Client/Home";
import Demo_classes from "../pages/Client/Demo_classes";
import TeachersPage from "../pages/Client/TeachersPage";
import Login from "../Components/Client/Login";
import Signup from "../Components/Client/Signup";
import Book_teachers from "../pages/Client/Book_teachers";
import ChatPage from "../pages/Client/ChatPage";
import RoomPage from "../Components/screen/Room";
import List_booking_page from "../pages/Client/List_booking_page";
import TeacherDetailPage from "../pages/Client/TeacherDetailPage";
import ReservationPage from "../pages/Client/ReservationPage";
import Profile_page from "../pages/Client/Profile_page";
import { Navigate } from "react-router-dom";
import ErrorPage from "../Components/Client/ErrorPage/ErrorPage";
import { useSelector } from 'react-redux'

function Student() {

const isAuth = useSelector(state => state.student.token);




  


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Demo_classes />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/book_teacher" element={isAuth?<Book_teachers /> :<Navigate to={"/login"}/>} />
        <Route path="/profile" element={isAuth?<Profile_page />:<Navigate to={"/login"}/>} />
        <Route path="/teacher_details/:id" element={<TeacherDetailPage />} />
        <Route path="/reservation/:id" element={isAuth?<ReservationPage />:<Navigate to={"/login"}/>} />
        <Route path="/list_booking" element={isAuth?<List_booking_page />:<Navigate to={"/login"}/>}/>
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/chat_room/:id" element={isAuth?<ChatPage />:<Navigate to={"/login"}/>} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default  Student;
