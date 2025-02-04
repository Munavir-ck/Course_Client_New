import React from 'react'
import Navbar from "../../Components/Client/Navbar";
import Classes from '../../Components/Client/Classes';
import Footer from '../../Components/Client/Footer';
import Head from '../../Components/Client/Head';

function Demo_classes() {
  return (
    <div>
      <Navbar/>
     <Head title={ "Our classes"}/>
      <Classes/>
      <Footer/>
    </div>
  )
}

export default Demo_classes
