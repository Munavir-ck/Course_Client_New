import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImArrowRight } from "react-icons/im";
import { BsFillWalletFill } from "react-icons/bs";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setTutor } from "../../Store/Slice/tutorSlice";
import { useNavigate } from "react-router-dom";
import { get_wallet } from "../../API/tutorReq";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [wallet, setWallet] = useState("");
  const studentName = useSelector((state) => state.tutor.name);

  useEffect(() => {
    
    get_wallet()
      .then((res) => {
        setWallet(res.data.wallet);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tutortoken");

    dispatch(
      setTutor({
        name: null,
        email: null,
        tutor_id: null,
        isLoggedIn: false,
      })
    );
    navigate("/tutor")
  };
  return (
    <div className="flex">
      <div className="w-60 flex flex-col h-screen p-3 bg-cyan-700 shadow duration-300">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{studentName}</h2>
          </div>
          <div className="relative">
            <div className="flex relative">
              <BsFillWalletFill size={30} color="white" />{" "}
              <span className="font-bold text-white mx-5 ">${wallet}</span>
            </div>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ImArrowRight />
                  <Link to={"/tutor/home"}>
                    <span className="text-gray-100">Home</span>
                  </Link>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ImArrowRight />
                  <Link to={"/tutor/profile"}>
                    <span className="text-gray-100">Profile</span>
                  </Link>
                </a>
              </li>
              <li className="rounded-sm">
                <Link to={"/tutor/manage_time"}>
                  <a className="flex items-center p-2 space-x-3 rounded-md">
                    <ImArrowRight />
                    <span className="text-gray-100">Time Manage</span>
                  </a>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link to={"/tutor/booking_list"}>
                  <a
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <ImArrowRight />
                    <span className="text-gray-100">Bookings</span>
                  </a>
                </Link>
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
                  <span onClick={handleLogout} className="text-gray-100">
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
