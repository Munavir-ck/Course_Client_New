import React from 'react'
import { motion } from "framer-motion";
import './head.css'

const Head = (props) => {
    console.log(props);
  return (
      <div className='w-full h-96 font-italic flex items-center justify-center  bg-no-repeat bg-cover bg-center'  style={{backgroundImage: `url("../../../banner-2.jpg" )`}} >
      {/* <img className="w-full object-contain  h-full" src="../../../banner-2.jpg" alt="Sunset in the mountains"/> */}
    <div>
      <motion.h1
        initial={{opacity:0,y:30,x:100}}
        animate={{opacity:1, fontSize:50,x:0,y:-10}} 
        transition={{delay:0.5,type:'spring',stiffness:120}}
      
      className="text-6xl text-white font-monospace shadow-2xl ">{props.title}</motion.h1>
    
      </div>
    
    </div>
  )
}

export default Head
