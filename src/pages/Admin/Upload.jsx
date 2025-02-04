import React from 'react'
import Sidebar from "../../Components/Admin/Sidebar";
import UploadClass from '../../Components/Admin/UploadClass';
import { Fragment } from "react";

function Upload() {
  return (
    <Fragment>
    <div className="flex overflow-y-auto ">
   <Sidebar/>
   <div className=" w-full ">
  <UploadClass/>

   </div>
 </div>

  </Fragment>
  )
}

export default Upload
