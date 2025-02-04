import React from 'react'
import Sidebar from '../../Components/Tutor/TutorNavbar'
import BookingList from '../../Components/Tutor/Booking_list'
function BookingList_page() {
  return (
    <div>
      <div className='h-screen flex w-full '>
    <Sidebar/>
    <div className='w-full'>
    <BookingList/>
 
    </div>
  </div>
    </div>
  )
}

export default BookingList_page
