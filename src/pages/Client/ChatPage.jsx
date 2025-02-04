import React from 'react'
import Navbar from "../../Components/Client/Navbar";

import Footer from '../../Components/Client/Footer';
import ChatRoom from '../../Components/Client/ChatRoom/ChatRoom';
import Head from '../../Components/Client/Head';

function ChatPage() {
  return (
    <div>
        <Navbar/>
        <Head/>
        <ChatRoom/>
        <Footer/>
      
    </div>
  )
}

export default ChatPage
