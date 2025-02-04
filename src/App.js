import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSocket } from "../src/contex/socketProvider";
import "./App.css";
import { useState, useEffect } from "react";

import Admin from "./Routes/Admin";
import Teacher from "./Routes/Teacher";
import User from "./Routes/Student";

function App() {
  const socket = useSocket();
  const [notification, setNotification] = useState(false);
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



  useEffect(() => {
    socket.on("student:notification", handleNotification);
    return () => {
      setNotification(false);
      socket.off("student:notification", handleNotification);
    };
  }, []);
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
       <Route path="/*" element={ <User />}/>
       <Route path="/admin/*" element={  <Admin />}/>
       <Route path="/tutor/*" element={ <Teacher />}/>
      
       

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
