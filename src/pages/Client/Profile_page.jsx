import React from 'react'
import Navbar from "../../Components/Client/Navbar";
import Profile from '../../Components/Client/Profile'
import Footer from "../../Components/Client/Footer";
import Head from '../../Components/Client/Head';

function Profile_page() {
  return (
    <div>
        <Navbar/>
        <Head title={ "Profile"}/>
        <Profile/>
        <Footer/> 
    </div>
  )
}

export default Profile_page
