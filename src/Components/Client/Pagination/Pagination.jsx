import React, { useEffect, useState } from 'react'

function Pagination({bookings,setCurrentPage,currentPage}) {

console.log(currentPage);

    const [pages,setPages]=useState([])


useEffect(()=>{
    if(bookings.length>0){

       const totalPages=Math.ceil(bookings.length/6)
       console.log(totalPages,"length");
       const arr=Array( totalPages).fill(0)
       setPages(arr)
     
    }
},[bookings])

const pageHandler=(currentPage)=>{
    
   
  setCurrentPage(currentPage)

}

const handleNext=()=>{
    setCurrentPage(currentPage+1)
}

const handlePrevious=()=>{
    if(currentPage!==1){
        setCurrentPage(currentPage-1)

    }
}

  return (
    <div>
      
<nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px">
    <li className={currentPage===1&&`hidden`}>
      <a 
       onClick={handlePrevious}
      className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    {pages.map((item,i)=>

    <li  className={ currentPage===i+1?"bg-slate-600":"bg-white"}>
      <a 
      
      onClick={() => pageHandler(i+1)}
      className={`px-3 py-2 leading-tight text-gray-500${ currentPage===i+1?"bg-slate-600":"bg-slate-600"} border border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{i+1}</a>
    </li>
    )}
   
    <li className={pages.length===currentPage&&`hidden`}>
      <a
      onClick={handleNext}
      
      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>

    </div>
  )
}

export default Pagination
