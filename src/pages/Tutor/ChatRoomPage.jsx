import React from 'react'
import Sidebar from '../../Components/Tutor/TutorNavbar'
import ChatRoom from '../../Components/Tutor/ChatRoomTutr/ChatRoom'
function ChatRoomTutorPage() {
  return (
    <div>
      <div className='h-screen flex w-full '>
    <Sidebar/>
    <div className='w-full'>
    <ChatRoom/>
 
    </div>
  </div>
    </div>
  )
}

export default ChatRoomTutorPage