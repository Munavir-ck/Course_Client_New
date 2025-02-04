import React, { useEffect, useState } from "react";
import Linechart from "./Linechart";
import {Link} from "react-router-dom";
import { ImArrowRight } from "react-icons/im";
import { BsFillWalletFill } from "react-icons/bs";
import axios from "../../axios/axios"
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

    const[wallet,setWallet]=useState("")
     const navigate= useNavigate()

useEffect(()=>{
   axios.get("/admin/get_wallet", {
    headers: { Authorization: localStorage.getItem("admintoken") },
  }).then((res)=>{
    const amount=res.data.result.balance
    console.log(amount);
  setWallet(amount)
  })


},[])

const handleLogout=()=>{
    localStorage.removeItem("admintoken")
    navigate("/admin/")
}

    return (
        <div className="flex">
            <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-white">Dashboard</h2>
                    </div>
                    <div className="flex relative">
                       <BsFillWalletFill size={30} color="white"/>  <span className="font-bold text-white mx-5 ">${wallet}</span>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <Link to={'/admin/home'}>
                                    <span className="text-gray-100">Home</span>
                                    </Link>
                                    

                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                 <ImArrowRight size={30} color="white"/>
                                    <Link to={'/admin/addTeachers'}>
                                    <span className="text-gray-100">Add Teacher</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                     <ImArrowRight size={30} color="white"/>
                                    <Link to={'/admin/teachers'}>
                                    <span className="text-gray-100">Teachers</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                     <ImArrowRight size={30} color="white"/>
                                    <Link to={'/admin/add_subject'}>
                                    <span className="text-gray-100">Add Subjects</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                     <ImArrowRight size={30} color="white"/>
                                    <Link to={'/admin/uploadclass'}>
                                    <span className="text-gray-100">Add Class</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                     <ImArrowRight size={30} color="white"/>
                                    <Link to={'/admin/transactions'}>
                                    <span className="text-gray-100">Transactions</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span 
                                    onClick={handleLogout}
                                    className="text-gray-100">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
}