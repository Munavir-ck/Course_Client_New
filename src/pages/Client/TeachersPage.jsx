import React from 'react'
import Teachers from "../../Components/Client/Teachers";
import Navbar from "../../Components/Client/Navbar";
import Footer from "../../Components/Client/Footer";
import Head from '../../Components/Client/Head';

function TeachersPage() {
  return (
    <div>
     <Navbar/>
     <Head title={ "Our Teachers"}/>
    
     <Teachers/>
     <Footer/> 
    </div>
  )
}

export default TeachersPage
