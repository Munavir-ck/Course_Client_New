import React, { useEffect, useState, useMemo, useCallback } from "react";
import { GoVerified } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios/axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../Store/Slice/socketSlice";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useSocket } from "../../contex/socketProvider";
import { setTeacher } from "../../Store/Slice/teacherSlice";
import Pagination from "./Pagination/Pagination";
import Spinner from "./Spinner/Spinner";

const List_bookings = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [notification, setNotification] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [currentPage,setCurrentPage]=useState(1)
  const navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)
  
  const id = useSelector((state) => state.student._id);
  const email = useSelector((state) => state.student.email);
  // const room = useSelector((state) => state.room.room);

  const handlechat = (studentId, teacherId) => {
    socket.emit("room:joinchat", studentId);

    dispatch(
      setTeacher({
        teacherId: teacherId,
      })
    );
  };

  const handlejoinChatRoom = (data) => {
    navigate(`/chat_room/${data}`);
  };

  useEffect(() => {
    socket.on("roomAlreadyExists", handlejoinChatRoom);
    socket.on("user:joined", handlejoinChatRoom);

    return () => {
      socket.off("roomAlreadyExists", handlejoinChatRoom);
      socket.off("user:joined", handlejoinChatRoom);
    };
  }, [socket]);

  const handleOnclick = (teacherId) => {
    const room=id
   
    socket.emit("room:join", { email,  room });
    dispatch(
      setTeacher({
        teacherId: teacherId,
      })
    );

    notification && toast.error("ready");
  };

  console.log(notification, "my notify");

  const handleNotification = (data) => {
    setNotification(true);

    toast.success("iam waitiiiiiiiiiiiiing");
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        const notification = new Notification("Incoming Video call", {
          body: "You have a video call",
          icon: "assets/icons/help-question-svgrepo-com.svg",
          tag: "video call",
          vibrate: [200, 100, 200],
        });
        notification.addEventListener("click", () => {
          // this.route.navigate(['/video-room',roomParams,user])
        });
      }
    });
  };
  const handlejoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("student:notification", handleNotification);
    return () => {
      setNotification(false);
      socket.off("student:notification", handleNotification);
    };
  }, []);

  useEffect(() => {
    socket.on("room:join", handlejoinRoom);

    return () => {
      socket.off("room:join", handlejoinRoom);
    };
  });

  const now = new Date();

  const currentTime = new Date(now.getTime());
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const time =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  const futureTime = new Date(now.getTime() + 10 * 60000);
  const future_hours = futureTime.getHours();
  const future_minutes = futureTime.getMinutes();
  console.log(time, "cuttern");
  const future_time =
    future_hours.toString().padStart(2, "0") +
    ":" +
    future_minutes.toString().padStart(2, "0");
  console.log(future_time, "future");
  useEffect(() => {
    setLoading(true)
    axios
      .get("/get_bookings", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false)
        setBookings(res.data.result);
      });
  }, []);

  const handleActions = (slot_id, order_id) => {
    setLoading(true)
    axios
      .post(
        "/cancel_booking",
        { slot_id, order_id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoading(false)
        if (res.data.status) {
          toast.success("Suuccefully Updated");
          let newObj = [];

          bookings.forEach((item) => {
           
            if (item._id === order_id) {
              console.log(3232323);
              if (item.slot._id === slot_id) {
                item.slot.booking_status = "Cancelled";
              }
            }
            newObj.push(item);
          });
         

          setBookings(newObj);
        }
      });

   
  };
  return (
    <div className={isLoading && "pointer-events-none opacity-20"}>
  {isLoading && <Spinner />}
  <div id="app" className="bg-white">
    <div className="container mx-auto">
      <ToastContainer />
      <div className="py-20">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-xs uppercase">
                <th className="px-6 py-3 text-center">Select</th>
                <th className="px-6 py-3">Teacher Info</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Fee</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.slice(currentPage * 6 - 6, currentPage * 6).map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="rounded-full w-14"
                          src={item.teacher ? item.teacher[0].image : "../../../avatar.png"}
                        />
                        <div className="ml-4">
                          <span className="capitalize block text-gray-800 font-semibold">
                            {item.teacher[0].name}
                          </span>
                          <span className="text-sm block text-gray-600">
                            {item.teacher[0].subject}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="capitalize w-10 text-white bg-green-800 rounded-md text-sm">
                        {item.slot.endTime}--{item.slot.startTime}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(item.slot.date).format("MMMM Do YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.slot.booking_status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        {item.slot.booking_status === "Cancelled" ? (
                          <div></div>
                        ) : time > item.slot.startTime && time < item.slot.endTime ? (
                          <button onClick={() => handleOnclick(item.teacher[0]._id)} className="bg-red-600">
                            <FcVideoCall size={30} />
                          </button>
                        ) : (
                          <button
                            className="hover:bg-zinc-700"
                            onClick={() => handleActions(item.slot._id, item._id)}
                          >
                            <GiCancel size={20} color="red" />
                          </button>
                        )}
                        <button
                          onClick={() => handlechat(item.student, item.teacher[0]._id)}
                        >
                          <BsFillChatFill size={30} color="blue" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center h-10 pt-6">
          <Pagination bookings={bookings} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default List_bookings;
