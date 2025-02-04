import React, { useEffect, useState } from 'react'
import axios from "../../../axios/axios";
import { motion } from "framer-motion";

function SearchTeacher({setData, setError}) {


    const[searchData,setSearchData]=useState('')

    const handleChange=async (e)=>{
        setSearchData(e.target.value)

       
    }
    useEffect(()=>{

        async function  Search() {
            await axios.post("/search_teacher",{
                searchData
            }).then((res)=>{
                console.log(res.data);
                if(res.data.status){
                    const result=res.data.result
                   setData(result)
                   setError(null)
                }
                else{
                    const error=res.data.message
                    setError(error)
                }
    
    
            }).catch((err)=>{
    
            })
        
        }
        Search()
    },[searchData])
  return (
    <motion.div 
    whileHover={{scale:1.1,color:"#e1eaf0"}}
    transition={{type:"spring",stiffness:120}}
 
 className='max-w-md mx-auto shadow-2xl border-2 rounded'>
     <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
         <div className="grid place-items-center h-full w-12 text-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
         </div>
 
         <input
         className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 "
         type="text"
         id="search"
         placeholder="Search something.."
         onChange={handleChange}
         value={searchData}
         
         /> 
     </div>
 </motion.div>
  )
}

export default SearchTeacher
