import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import Modal from "react-modal";

function Slot(probs) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      width: "400px",
    },
  };

  const data = probs.values;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [slot, setSlot] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    axios
      .get("/tutor/get_slot", {
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      })
      .then((res) => {
        setSlot(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data]);

  return (
    <div className="mt-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Available Slots
      </h1>

      <div className="flex flex-wrap gap-4">
        {slot?.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setModalIsOpen(true);
              setSelectedData(item);
            }}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
          >
            Slot-{i + 1}
          </button>
        ))}
      </div>

      {selectedData && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Slot Details"
          style={customStyles}
        >
          <div className="relative w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Slot Details
              </h2>
              <button
                onClick={() => setModalIsOpen(false)}
                className="text-gray-600 dark:text-white hover:text-red-500 transition"
              >
                ✖
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-green-100 rounded-md">
                <p className="text-gray-600 font-medium">Date:</p>
                <p className="font-bold text-gray-800">{selectedData.date}</p>
              </div>

              <div className="flex justify-between p-3 bg-blue-100 rounded-md">
                <p className="text-gray-600 font-medium">Starting Time:</p>
                <p className="font-semibold text-gray-900">
                  {selectedData.startTime}
                </p>
              </div>

              <div className="flex justify-between p-3 bg-yellow-100 rounded-md">
                <p className="text-gray-600 font-medium">End Time:</p>
                <p className="font-semibold text-gray-900">
                  {selectedData.endTime}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalIsOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Slot;
