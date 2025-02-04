import React from 'react'
import Navbar from '../../Components/Client/Navbar'
import Head from '../../Components/Client/Head'
import Footer from '../../Components/Client/Footer'
import TeacherDetail from '../../Components/Client/TeacherDetail'

function TeacherDetailPage() {
  return (
    <div>
      <Navbar/>
        <Head title={ "Teacher Details"}/>
        <TeacherDetail/>
        <Footer/>  
    </div>
  )
}

export default TeacherDetailPage
