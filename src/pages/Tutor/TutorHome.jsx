import React from 'react'
import Linechart from '../../Components/Tutor/Chart/Linechart'
import Sidebar from '../../Components/Tutor/TutorNavbar'
import DayReport from '../../Components/Tutor/DayReport/DayReport'
import Countchart from '../../Components/Tutor/Chart/Countchart'

function TutorHome() {
  return (
    <div className="flex w-full ">
      <div className="flex  w-full ">
        <Sidebar />
        <div className="flex flex-col w-full overflow-y-auto h-screen">
          <DayReport/>
          <div className=" flex flex-col md:flex-row md:justify-between ">
            <div className="w-full md:w-1/2">
              <Linechart />
            </div>
            <div className="w-full md:w-1/2">
              <Countchart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorHome
