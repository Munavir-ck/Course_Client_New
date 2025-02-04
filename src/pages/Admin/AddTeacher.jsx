import React from 'react'
import Sidebar from "../../Components/Admin/Sidebar";
import AddTeachers from '../../Components/Admin/AddTeachers';
import { Fragment } from "react";
function AddTeacher() {
  return (
    <Fragment>
    <div className='flex overflow-hidden'>
        
        <Sidebar/>
     
     
      < AddTeachers />
    
      
    </div>
    </Fragment>
  )
}

export default AddTeacher
