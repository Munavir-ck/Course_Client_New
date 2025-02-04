import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Paypal from "./Paypal/Paypal";
import { ToastContainer, toast } from "react-toastify";
import ModalSuccess from "./Modal/ModalSuccess";
import Spinner from "./Spinner/Spinner";
import { filter_slot, getReservation } from "../../API/userReq";
import { FaSearch } from "react-icons/fa";

function Reservation() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterdSlot, setFiltersSlot] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [modal, setmodal] = useState(false);
  const [selectedData,setSelectedData]=useState({});
  let { id } = useParams();

  const handleSubmit = () => {
    if (checkedValues.length !== 0) {
      setSubmit(true);
    } else {
      toast.error("Please select a slot.");
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValues((prev) =>
      isChecked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  useEffect(() => {
    setLoading(true);
    getReservation(id)
      .then((res) => {
        setLoading(false);
        setTeacher(res.data.result);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const date = new Date();
    let currentDate = new Date(date.setUTCHours(0, 0, 0, 0));
    if (selectedDate >= currentDate) {
      filter_slot(id, selectedDate)
        .then((res) => {
          setFiltersSlot(res.data.status ? res.data.result[0].slots : []);
        })
        .catch(() => {});
    } else {
      toast.error("Invalid date selection.");
    }
  }, [selectedDate]);

  const handleShowDetailClick = (slot) => {
    setSelectedData(slot);
    setModalIsOpen(true);
  };

 
  

  return (
    <div
      className={`relative ${isLoading && "pointer-events-none opacity-70"}`}
    >
      {isLoading && <Spinner />}
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative mx-auto mt-20 mb-10 max-w-screen-lg overflow-hidden rounded-xl bg-mycolors text-center text-white py-20 shadow-xl">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Book Your Teacher
        </h1>
        <p className="mt-4 text-lg">
          Get an appointment with expert instructors
        </p>
      </div>

      {/* Teacher Card */}
      <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={teacher?.image || "/avatar.png"}
            alt="Teacher"
            className="w-40 h-40 rounded-full shadow-lg object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {teacher?.name}
            </h2>
            <p className="text-lg text-gray-600">
              <strong>Class:</strong> {teacher?.class}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Subject:</strong> {teacher?.subject}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Qualification:</strong> {teacher?.qualification}
            </p>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="max-w-lg mx-auto mt-10">
        <h3 className="text-xl font-bold text-indigo-600">Select a Date</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          className="w-full text-gray-700 mt-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Time Slots */}
      <div className="max-w-screen-lg mx-auto mt-10">
        <h3 className="text-xl font-bold text-indigo-600">Select a Time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filterdSlot.length !== 0 ? (
        filterdSlot.map((item, i) => (
          <div key={i} className="relative">
            <input
             defaultChecked={false}
            
              type="checkbox"
              id={`slot${i}`}
              value={item._id}
              onChange={handleCheckboxChange}
              className="hidden peer"
            />
            <label
              htmlFor={`slot${i}`}
              className={`block w-full text-center py-3 px-4 border rounded-lg cursor-pointer font-semibold transition ${
                item.booking_status === "booked"
                  ? "bg-gray-400 cursor-not-allowed text-gray-700"
                  : "bg-indigo-500 hover:bg-indigo-600 peer-checked:bg-green-500 peer-checked:border-green-700 peer-checked:font-bold peer-checked:text-white"
              }`}
            >
              Slot {i + 1}
              {/* Show Detail Icon */}
              <button
                onClick={() => handleShowDetailClick(item)}
                className="absolute top-2 right-2 text-indigo-600 hover:text-indigo-800"
              >
                <FaSearch size={20} />
              </button>
            </label>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No slots available.</p>
      )}
        </div>
        ;
      </div>

      {/* Book Now Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleSubmit}
          className="w-56 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition hover:scale-105"
        >
          Book Now
        </button>
      </div>

      {/* Paypal Payment */}
      <div className="w-80 mx-auto mt-10">
        {submit && (
          <Paypal amount={teacher?.FEE} checkedValues={checkedValues} />
        )}
      </div>

      {/* Modal */}
      {modalIsOpen && selectedData && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold">Slot Details</h2>
            <p className="text-gray-700 mt-2">Time: {selectedData.startTime}--{selectedData.endTime}</p>
            <p className="text-gray-700 mt-2">Status: {selectedData.booking_status}</p>
            <p className="text-gray-700 mt-2">Date: {selectedData.date}</p>
            <button
              onClick={() => setModalIsOpen(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Reservation;
