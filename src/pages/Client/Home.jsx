import Navbar from "../../Components/Client/Navbar";

import React from 'react'
import Banner from "../../Components/Client/Banner";
import Classes from "../../Components/Client/Classes";
// import Teachers from "../../Components/Client/Teachers";
import Footer from "../../Components/Client/Footer";

function Home() {
  return (
    <div>
     <Navbar/>
     <Banner/>
     <Classes/>
   
     <Footer/>
    </div>
  )
}

export default Home
