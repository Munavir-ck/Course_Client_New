
import Sidebar from "../../Components/Admin/Sidebar";
import Teachers_list from "../../Components/Admin/Teachers_list";

import React from 'react'

function TeachersList() {
  return (
  <div className="overflow-y-hidden">
    <div className="flex ">
   <Sidebar/>
   <div className=" w-full ">
   <Teachers_list />

   </div>
 </div>

  </div>
  )
}

export default TeachersList
