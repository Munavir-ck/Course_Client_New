import React, { useEffect, useState, useCallback } from "react";
import axios from "../../axios/axios";
import { GoVerified } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../contex/socketProvider";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../Store/Slice/socketSlice";
import { setStudentId } from "../../Store/Slice/studentIdSlice";

function Booking_list() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const socket = useSocket();
  const navigate = useNavigate();
  const email = useSelector((state) => state.tutor.email);

  // Get current time as HH:MM string
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  // Emit chat join event and update Redux store with student ID
  const handlechat = (studentId) => {
    socket.emit("room:joinchat", studentId);
    dispatch(setStudentId({ studentId }));
  };

  // Navigate to the chat room once the socket event is received
  const handlejoinChatRoom = (data) => {
    navigate(`/tutor/chat_room_tutor/${data}`);
  };

  useEffect(() => {
    socket.on("roomAlreadyExists", handlejoinChatRoom);
    socket.on("user:joined", handlejoinChatRoom);
    return () => {
      socket.off("roomAlreadyExists", handlejoinChatRoom);
      socket.off("user:joined", handlejoinChatRoom);
    };
  }, [socket]);

  // Emit join room and display-notification events for video call
  const handleOnclick = (studentId) => {
    const room = studentId;
    socket.emit("room:join", { email, room });
    socket.emit("display-notification", { studentId }, studentId);
  };

  // When the room is joined, navigate to the room view
  const handlejoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handlejoinRoom);
    return () => {
      socket.off("room:join", handlejoinRoom);
    };
  }, [socket, handlejoinRoom]);

  // Fetch booking data from the backend
  useEffect(() => {
    axios
      .get("/tutor/get_bookings", {
        headers: { Authorization: localStorage.getItem("tutortoken") },
      })
      .then((res) => {
        setBookings(res.data.result);
      });
  }, []);

  // Handle booking action (accept/decline)
  const handleActions = (e) => {
    const order_id = e.currentTarget.dataset.order_id;
    const value = e.currentTarget.dataset.value;
    const slot_id = e.currentTarget.dataset.id;

    axios
      .post(
        "/tutor/booking_actions",
        { value, order_id, slot_id },
        {
          headers: { Authorization: localStorage.getItem("tutortoken") },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("Successfully Updated");
          const updatedBookings = bookings.map((item) => {
            if (item._id === order_id && item.slot._id === slot_id) {
              return {
                ...item,
                slot: {
                  ...item.slot,
                  booking_status:
                    item.slot.booking_status === "success" ? "failed" : "success",
                },
              };
            }
            return item;
          });
          setBookings(updatedBookings);
        }
      });
  };

  return (
    <div className="h-screen overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-md w-full">
        <ToastContainer />
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold text-xl">
              Products Order
            </h2>
            <span className="text-xs text-gray-500">All products items</span>
          </div>
        </div>

        {/* Desktop View (Table Layout) */}
        <div className="hidden md:block">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Slot
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Booking Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((item) => (
                    <tr key={item._id}>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full object-cover"
                              src={
                                item.student[0].image
                                  ? item.student[0].image
                                  : "../../../avatar.png"
                              }
                              alt="Student"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.student[0].name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.slot.endTime} -- {item.slot.startTime}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.slot.date}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">
                            {item.slot.booking_status}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm flex justify-around">
                        {time > item.slot.startTime &&
                        time < item.slot.endTime &&
                        item.slot.booking_status !== "Cancelled" ? (
                          <button
                            onClick={() =>
                              handleOnclick(item.student[0]._id)
                            }
                            className="bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Join
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={handleActions}
                              data-id={item.slot._id}
                              data-order_id={item._id}
                              data-value="accept"
                              className="text-green-600"
                            >
                              <GoVerified size={20} />
                            </button>
                            <button
                              onClick={handleActions}
                              data-id={item.slot._id}
                              data-order_id={item._id}
                              data-value="decline"
                              className="text-red-600"
                            >
                              <GiCancel size={20} />
                            </button>
                            <button
                              onClick={() => handlechat(item.student[0]._id)}
                              className="text-blue-600"
                            >
                              <BsFillChatFill size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile View (Card Layout) */}
        <div className="block md:hidden">
          {bookings.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex items-center">
                <div className="w-16 h-16">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={
                      item.student[0].image
                        ? item.student[0].image
                        : "../../../avatar.png"
                    }
                    alt="Student"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-900 font-semibold">
                    {item.student[0].name}
                  </h3>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Slot:</span>{" "}
                  {item.slot.endTime} -- {item.slot.startTime}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {item.slot.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  {item.slot.booking_status}
                </p>
              </div>
              <div className="mt-2 flex space-x-4">
                {time > item.slot.startTime &&
                time < item.slot.endTime &&
                item.slot.booking_status !== "Cancelled" ? (
                  <button
                    onClick={() => handleOnclick(item.student[0]._id)}
                    className="bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Join
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleActions}
                      data-id={item.slot._id}
                      data-order_id={item._id}
                      data-value="accept"
                      className="text-green-600"
                    >
                      <GoVerified size={20} />
                    </button>
                    <button
                      onClick={handleActions}
                      data-id={item.slot._id}
                      data-order_id={item._id}
                      data-value="decline"
                      className="text-red-600"
                    >
                      <GiCancel size={20} />
                    </button>
                    <button
                      onClick={() => handlechat(item.student[0]._id)}
                      className="text-blue-600"
                    >
                      <BsFillChatFill size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Booking_list;
