import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";

function ChatRoom() {
  const student = useSelector((state) => state.student._id);
  const teacher_id = useSelector((state) => state.teacher.teacher_id);

  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    axios
      .get("/get_chat_reciever", {
        params: { teacher: teacher_id },
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setTeacher(res.data.result);
      });
  }, [teacher_id]);

  console.log(newMessage, "here is new message client");

  return (
    <div className="flex flex-col md:flex-row h-screen antialiased text-gray-800">
      {/* Sidebar */}
      <div className="flex flex-col py-8 pl-6 pr-2 w-full md:w-64 bg-white flex-shrink-0 mb-4 md:mb-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>
        <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={teacher.image}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-sm font-semibold mt-2">{teacher.name}</div>
          <div className="text-xs text-gray-500">{teacher.email}</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-auto h-full p-4 md:p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          {/* Chat Messages */}
          <div className="flex flex-col h-full overflow-y-auto mb-4">
            <div className="flex flex-col">
              <div className="grid grid-cols-12 gap-y-2">
                {/* Example static message */}
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      A
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>sdsddadad</div>
                    </div>
                  </div>
                </div>

                {/* Render messages */}
                {messages.map((item) =>
                  item.sender === student ? (
                    <div key={item.id || Math.random()} className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>{item.message}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={item.id || Math.random()} className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{item.message}</div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* New Message Preview */}
                {newMessage && (
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{newMessage}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <ChatInput setMessages={setMessages} setnewMessage={setnewMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
