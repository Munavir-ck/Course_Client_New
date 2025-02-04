import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { LoginSocialGoogle } from "reactjs-social-login";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setTutor } from "../../Store/Slice/tutorSlice";
import { login } from "../../API/tutorReq";

function TeacherLogin() {
  const [user, setUser] = useState(" ");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuth = async (datas) => {
   
    setUser(datas);
    
    login(datas)
    .then((res) => {    
      if (res.data.status) {    
        toast.success(res.data.message);
        localStorage.setItem("tutortoken", res.data.token);
       
        dispatch(
          setTutor({
            name: res.data.tutor.name,
            email: res.data.tutor.email,
            tutor_id: res.data.tutor._id,
            isLoggedIn: true,
            token:res.data.token
          })
        );
        navigate("/tutor/profile");
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div>
    

      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold">
                  Login Form with Floating Labels
                </h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <LoginSocialGoogle
                    client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onResolve={googleAuth}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <GoogleButton />
                  </LoginSocialGoogle>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
