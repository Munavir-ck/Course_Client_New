import React from 'react'
import TutorProfile from '../../Components/Tutor/TutorProfile'
import Sidebar from '../../Components/Tutor/TutorNavbar'

function TutorProfilePage() {
  return (
    <div className='h-screen flex w-full '>
      <Sidebar/>
      <div className='w-full'>
      <TutorProfile/>
      </div>
    </div>
  )
}

export default TutorProfilePage
