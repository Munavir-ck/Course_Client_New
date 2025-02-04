import Sidebar from "../../Components/Admin/Sidebar";

import AdminData from "../../Components/Admin/AdminData";
import LineChart from "../../Components/Admin/Chart/LineChart";

import PieChart from "../../Components/Admin/Chart/PieChart";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "tailwindcss/tailwind.css";
import axios from "../../axios/axios";


import { useState,useEffect } from "react";

import React from "react";

function AdminHome() {


  const[startDate,setStartDate]=useState()
  const[endDate,setEndDate]=useState(new Date()) 
  const [totalBooking, setTotalBooking] = useState([]);
const [bookingProfit, setBookingProfit] = useState([]);
const [bookingCount, setBookingCount] = useState([]);
const [months, setMonths] = useState([]);






  useEffect(() => {





    axios.get("/admin/get_monthlylineChart",{
  params:{
    startDate,
    endDate
  },
   headers: {
    Authorization: localStorage.getItem("admintoken"),
  }
    })
    
    .then((res) => {

 
      setTotalBooking(res.data.totalBooking);
      setBookingProfit(res.data.bookingProfit);
      setBookingCount(res.data.bookingCount);
      setMonths(res.data.months);
    });
  
  }, [ startDate, endDate]);


  
  return (
    <div className="flex w-full ">
      <div className="flex  w-full ">
        <Sidebar  />
        <div className="flex flex-col w-full overflow-y-auto h-screen">
          <AdminData />
          <div className="flex justify-around w-2/4">
          <div className="relative mt-4 w-56">
          <DatePicker
        
                   maxDate={endDate}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full text-gray-700 py-2 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                />
                </div>
                <h1 className="font-bold mt-5">TO</h1>
                <div className="relative mt-4 w-56">
          <DatePicker
            minDate={startDate}
                   maxDate={new Date()}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full text-gray-700 py-2 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                />
                </div>

                </div>
          <div className=" mt-10 flex flex-col md:flex-row md:justify-between ">
            <div className="w-full md:w-1/2">
              <LineChart totalBooking={totalBooking} bookingProfit={bookingProfit} bookingCount={bookingCount} months={months} />
            </div>
            <div className="w-full md:w-1/2">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

