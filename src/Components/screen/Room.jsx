import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
import { useSocket } from "../../contex/socketProvider";
import { IoMdCall } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdJoinFull, MdCallEnd } from "react-icons/md";
import Rating_modal from  "../Client/RatingModal/Rating_modal"

const RoomPage = () => {
  const navigate = useNavigate();
  const room = useSelector((state) => state.room.room);
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [chat, setChat] = useState("");
  const [displayChat, setDisplayChat] = useState("");
  const[modal,setModal]=useState(false)


  const studentid = useSelector(state => state.student._id)
  const teacher = useSelector(state => state.tutor.tutor_id)

 console.log(teacher,"teacherrrrr iddddddddd");
  console.log(studentid,"student iddddddddd");


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleChat = useCallback(async (e) => {
    e.preventDefault();
    socket.emit("user:chatInvideo", { to: room, chat });
    setChat("");
  });

  const handleDisplayChat = useCallback(({ chat }) => {
    setDisplayChat(chat);
  });

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const deleteStream = () => {
    // Stop local stream tracks
    if (myStream) {
      myStream.getTracks().forEach(track => {
        track.stop();  // This actually turns off the camera/mic
      });
    }
  
    // Stop remote stream tracks
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  
    // Clear states
    setRemoteStream(null);
    setMyStream(null);
  
    // Handle navigation
    if (teacher) {
      navigate("/tutor/booking_list");
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      console.log(ev,"GOT TRACKS!!");
      alert(ev,"GOT TRACKS!!");
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    // socket.on('student:notification', handleNotification);
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("user:displaychat", handleDisplayChat);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  {console.log('My Stream State:', myStream)}
{myStream && console.log('Stream Tracks:', myStream.getTracks())}

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {modal && <Rating_modal modal={modal} setModal={setModal} />}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 shadow-xl">
          <div className="h-96 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            <div className="flex-1 bg-gray-700 rounded-lg p-3 mb-4 overflow-y-auto">
              <div className="text-sm bg-blue-600 rounded-lg p-2 mb-2 max-w-[80%]">
                {displayChat}
              </div>
            </div>
            <form onSubmit={handleChat} className="flex gap-2">
              <input
                type="text"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Video Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Remote Stream */}
          {remoteStream && (
            <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Remote Stream</h2>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  playing
                  muted
                  width="100%"
                  height="100%"
                  url={remoteStream}
                />
              </div>
            </div>
          )}

          {/* Local Stream */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{myStream ? "Your Stream" : "Room Controls"}</h2>
              {myStream && (
                <button
                  onClick={deleteStream}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MdCallEnd className="text-xl" />
                  End Call
                </button>
              )}
            </div>

            {!myStream ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden flex flex-col items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {remoteSocketId ? "Connected" : "Waiting to connect..."}
                  </h3>
                  {remoteSocketId && (
                    <button
                      onClick={handleCallUser}
                      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg flex items-center gap-2 transition-colors"
                    >
                      <IoMdCall className="text-2xl" />
                      Start Call
                    </button>
                  )}
                </div>
              </div>
            ) : (
             // In your component's return statement, modify the local stream section:
<div className="aspect-video bg-black rounded-lg overflow-hidden relative">
  <ReactPlayer
    playing
    muted
    width="100%"
    height="100%"
    url={myStream}
  />
  
  {/* Share Stream Button - Always visible when myStream exists */}
  {myStream && (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
      <button
        onClick={sendStreams}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors z-10"
      >
        <MdJoinFull className="text-xl" />
        Share Stream
      </button>
    </div>
  )}
</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
