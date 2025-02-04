import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios"
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";



function Rating_modal({ modal, setModal }) {
  const navigate = useNavigate();
  const teacher_id = useSelector((state) => state.teacher.teacher_id);
 

  const [stars, setStars] = useState([
    { id: 1, clicked: false },
    { id: 2, clicked: false },
    { id: 3, clicked: false },
    { id: 4, clicked: false },
    { id: 5, clicked: false },
  ]);

  const [review,setReview]=useState("")
  if (!modal) return null;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "380px",
      width: "400px",
      overflow: "hidden",
    },
  };
 const handleSubmit=()=>{
    let count =stars.filter(obj => obj.clicked === true).length;
    console.log(count);
    console.log(review);
  axios.post("/customer_review", {
    count ,
    review,
    teacher_id
  },
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }
).then((res)=>{
 toast.success("success")
}).catch((err)=>{
    console.log(err);
})
setReview("")
navigate("/")
 }
  
  const handleClick = (starId) => {
    setStars(stars.map((star) =>
      star.id === starId ? { ...star, clicked:!star.clicked } : star
    ));
  };

  return (
    <>
      <div
        // onClick={() => setModal(false)}
        className="h-screen w-screen bg-mycolors absolute "
      >
        <Modal
          // classNameName="scrollbar-hide"
          isOpen={true}
          contentLabel="Example Modal"
          style={customStyles}
        >
                <ToastContainer />
          <h1 classNameName="font-bold">RATE US</h1>

         <div className="flex items-center">
         {stars.map((star)=>(

            <svg
              aria-hidden="true"
              id={star.id}
              onClick={() => handleClick(star.id)}
              className={`w-5 h-5 ${star.clicked? "text-yellow-400": "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>


         ))}
           
          
           
          </div>
          <h1 classNameName="font-bold my-10">CUSTOMER REVIEW</h1>

          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
          onChange={(e)=>setReview(e.target.value)}
            id="message"
            rows="4"
            value={review}
            className="block p-2.5 float-left w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button 
          onClick={handleSubmit}
          type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
      <button 
          onClick={()=>navigate("/")}
          type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">HOME</button>
        </Modal>
      </div>
    </>
  );
}
export default Rating_modal;
