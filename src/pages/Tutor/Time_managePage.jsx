import React from 'react'

import TimeMange from '../../Components/Tutor/Time_mange'
import Sidebar from '../../Components/Tutor/TutorNavbar'


function TimeManagePage() {
  return (
    <div className='h-screen flex w-full '>
    <Sidebar/>
    <div className='w-full'>
    <TimeMange/>
 
    </div>
  </div>
  )
}

export default TimeManagePage
