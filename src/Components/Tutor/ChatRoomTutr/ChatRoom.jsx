import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios/axios";
import ChatInput from "./ChatInput";

const ChatRoom = () => {
  // State and Redux
  const student_Id = useSelector((state) => state.studentId.student_Id);
  const teacher = useSelector(state => state.tutor.tutor_id);
  const [messages, setMessages] = useState([]);
  const [student, setStudent] = useState({});
  const [newMessage, setNewMessage] = useState("");

  // Fetch student data
  useEffect(() => {
    axios.get("/tutor/get_chat_reciever", {
      params: { student: student_Id },
      headers: { Authorization: localStorage.getItem("tutortoken") }
    })
    .then((res) => setStudent(res.data.result))
    .catch(console.error);
  }, [student_Id]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white border-r flex-shrink-0">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">QuickChat</h1>
            </div>
          </div>

          {/* Student Info */}
          <div className="p-4">
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={student.image || "https://via.placeholder.com/150"} 
                  alt={student.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-2 font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-600">{student.email}</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((item) => (
                <div key={item.id} className={`flex ${item.sender === teacher ? 'justify-end' : ''}`}>
                  <div className={`max-w-[75%] flex ${item.sender === teacher ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {item.sender === teacher ? 'T' : 'S'}
                    </div>

                    {/* Message Bubble */}
                    <div className={`mx-2 p-3 rounded-lg ${
                      item.sender === teacher 
                        ? 'bg-indigo-100 rounded-tr-none' 
                        : 'bg-white rounded-tl-none'
                    }`}>
                      <p className="text-sm">{item.message}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* New Message Preview */}
              {newMessage && (
                <div className="flex">
                  <div className="max-w-[75%] flex">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      S
                    </div>
                    <div className="mx-2 p-3 bg-white rounded-lg rounded-tl-none">
                      <p className="text-sm">{newMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="max-w-4xl mx-auto">
              <ChatInput 
                setMessages={setMessages}
                setNewMessage={setNewMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;