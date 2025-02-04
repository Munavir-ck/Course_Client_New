import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Paypal from "../PaypalAdmin/Paypal";
function ShareProfit({ modal, setModal,teacher, transaction_id }) {

    

    const[submit,setSubmit]=useState(false)

    const adminProfit=((teacher.FEE)/100)*15
    const teacherProfit=(teacher.FEE)-adminProfit

    console.log(adminProfit);
  const navigate = useNavigate();
  if (!modal) return null;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "450px",
      width: "400px",
      overflow: "hidden",
    },
  };
  return (
  
      <div
      
        class="h-screen w-screen bg-mycolors absolute "
      >
        <Modal
        
          isOpen={true}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div class="bg-white p-6  md:mx-auto">
            <div class="grid grid-cols-2 bg-white mb-6 border-2 p-6 rounded-md">
              <div class="flex flex-col items-center">
                <p class="text-lg font-semibold">TEACHER FEE:</p>
                <p class="text-3xl font-semibold text-green-500">{teacher.FEE}</p>
              </div>
              <div class="flex flex-col items-center">
                <p class="text-lg font-semibold">Teacher Name:</p>
                <p class="text-3xl font-semibold text-red-500">{teacher.name}</p>
              </div>
            </div>
            <div class=" md:p-10 py-2 px-4">
              <p class="text-md ">Teacher Profit</p>
              <div class="flex items-center">
                <input
                  type="text"
                  value={teacherProfit}
                  class="p-2 border-2 w-full rounded-md outline-none text-red-700 font-bold"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 ml-2 hover:cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <div class="py-5 text-center">
                
                <a
                  onClick={() => setSubmit(true)}
                  href="#"
                  class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  SUBMIT
                </a>
                <a
                  onClick={() =>setModal(false)}
                  href="#"
                  class="px-12 bg-red-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Cancel
                </a>
              </div>
            </div>
            {submit&&<Paypal amount={teacherProfit} teacherId={teacher._id}  transaction_id={transaction_id}/>}
          </div>
        </Modal>
      </div>
   
  );
}

export default ShareProfit;
