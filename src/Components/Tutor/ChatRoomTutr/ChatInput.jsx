import React, { useState, useEffect } from "react";
import { useSocket } from "../../../contex/socketProvider";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";

function ChatInput({ setMessages, setnewMessage }) {
  const student_Id = useSelector((state) => state.studentId.student_Id);
  const socket = useSocket();

  const [chat, setChat] = useState("");
 

  // console.log(newMessage, "here is new messaes");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "/tutor/create_chat",
      { message: chat, student: student_Id },
      {
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      }
    );
    socket.emit("user:message", { data: chat, studentId: student_Id });
    setChat("");
  };
  
  const handleNewMessage=(data)=>{
    console.log(data,"here is new socketDDDDDDDDDDDDDDDDDDD");
    setnewMessage(data)
    }
  useEffect(() => {
    socket.on("new:message", handleNewMessage);

    console.log("iam use effect");
    axios
      .get("/tutor/get_messages", {
        params: {
          student: student_Id,
        },

        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      })
      .then((res) => {
        setMessages(res.data.result);
        setnewMessage("")
      });
  }, [chat]);

  return (
    <form onSubmit={handleSubmit} class="flex-grow ml-4 flex">
      <div class="flex-grow ml-4">
        <div class="relative w-full">
          <input
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            type="text"
            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div class="ml-4">
        <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
          <span>Send</span>
          <span class="ml-2">
            <svg
              class="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
