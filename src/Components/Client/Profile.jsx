import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner/Spinner";
import { useDispatch } from "react-redux";
import { setStudent } from "../../Store/Slice/student_slice";
import "./profile.css";
import { edit_profile_image, get_profile } from "../../API/userReq";


function Profile() {
  const dispatch = useDispatch();
  const [isLoading,setLoading]=useState(false)
  const [student, setStudents] = useState({});
  const [image, setImage] = useState(null);
  const [newImage, setNewimage] = useState(null);

  const toBase64 = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).catch((err) => {
      console.log(err);
    });

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    async function editProfile() {

      if (image) {
        setLoading(true)
        const imgBase = await toBase64(image);
      
        setImage(null);
        edit_profile_image(imgBase)
          .then((res) => {
            setLoading(false)
            toast.success("success");
          
            setNewimage(res.data.data.image);
            dispatch(
              setStudent({
                image: res.data.data.image,
                name: student.name,
                email: student.email,
                isLoggedIn: true,
                _id: student._id,
                token:  localStorage.getItem("token")
              })
            );
         
          })
          .catch((res) => {
            console.log("error");
            toast.error("error");
          });
      }
    }

    editProfile();
  }, [image]);

  useEffect(() => {
    setLoading(true)
    get_profile()
      .then((res) => {
        console.log(res.data);
        setLoading(false)
        if (res.data.status) {

          setStudents(res.data.result);
        }
     
      });
  }, [newImage]);


  return (
    <div className= {isLoading&&"pointer-events-none opacity-20"}>{isLoading&&<Spinner/>}
      <div className="bg-gray-100">
    

        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
             
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={student?.image ? student?.image : "../../../userprofile.jpg"} 
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                 {student?.name}
                </h1>
               
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                  <div classNameName="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        classNameName="bg-green-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Image
                        <label className="block">
                          <span className="sr-only">Choose File</span>
                          <input
                            type="file"
                            onChange={handleImage}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </label>
                      </button>
                    </div>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-3 hover:shadow">
                
                
              </div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2"> {student?.name}</div>
                    </div>
                    
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">Female</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2"> {student?.phone}</div>
                    </div>
                    
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">
                       {student?.address},{student?.city}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href="mailto:jane@example.com">
                         {student?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Class</div>
                      <div className="px-4 py-2">{student?.className}</div>
                    </div>
                  </div>
                </div>
                <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                  Show Full Information
                </button>
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
