import React from 'react'

import Navbar from "../../Components/Client/Navbar";

import Footer from '../../Components/Client/Footer';

import Reservation from '../../Components/Client/Reservation';

function ReservationPage() {
  return (
    <div>
        <Navbar/>
        {/* <Head/> */}
        <Reservation/>
        <Footer/>
        
      
    </div>
  )
}

export default ReservationPage
