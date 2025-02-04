import Navbar from "../../Components/Client/Navbar";

import Footer from '../../Components/Client/Footer';
import Booking from "../../Components/Client/Booking";
import Head from '../../Components/Client/Head';

import React from 'react'

function Book_teachers() {
  return (
    <div>
     <Navbar/>
     <Head title={ "Book our Teachers"}/>
    <Booking/>
      <Footer/>
    </div>
  )
}

export default Book_teachers
