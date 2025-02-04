import React, { useState } from "react";
import Slot from "../../Components/Tutor/Slot";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create_slot } from "../../API/tutorReq";

function TimeManage() {
  const initialState = { date: "", endTime: "", startTime: "" };
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const currentDate = new Date();
    const selectedDate = new Date(values.date);

    if (!values.date) {
      errors.date = "Date is required";
      toast.error(errors.date);
    }
    if (!values.startTime) {
      errors.startTime = "Start Time is required";
      toast.error(errors.startTime);
    }
    if (!values.endTime) {
      errors.endTime = "End Time is required";
      toast.error(errors.endTime);
    }
    if (values.startTime && values.endTime && values.startTime >= values.endTime) {
      errors.time = "Choose a valid time range";
      toast.error(errors.time);
    }
    if (values.date && selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      errors.date = "Choose a future date";
      toast.error(errors.date);
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      create_slot(formValues)
        .then((res) => {
          if (res.data.status) {
            toast.success("Slot created successfully");
            setSubmit(true);
            setFormValues(initialState);
          } else {
            toast.error("Error creating slot");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center p-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Manage Time Slots</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formValues.startTime}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formValues.endTime}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
        <Slot values={submit} />
      </div>
    </div>
  );
}

export default TimeManage;
