import React from 'react'
import Add_subject from '../../Components/Admin/Add_subject'
import Sidebar from '../../Components/Admin/Sidebar';
import { Fragment } from "react";


function Add_subjectPage() {
  return (
    <Fragment>
    <div className="flex overflow-y-auto ">
   <Sidebar/>
   <div className=" w-full ">
  <Add_subject/>

   </div>
 </div>

  </Fragment>
  )
}

export default Add_subjectPage
