import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner/Spinner";
import { signup } from "../../API/userReq";
import { get_otp, verify_otp } from "../../API/userReq";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiHome,
  FiPhone,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    class: "",
    address: "",
    city: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isCheck, setCheck] = useState(false);
  const [otp, setOtp] = useState(false);
  const [storeOTP, setStoreotp] = useState("");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleOtp = async () => {
    const number = formValues.phone;
    setOtp(true);
    get_otp(number);
  };

  const handleChangeotp = (e) => {
    const OTP = e.target.value;
    setStoreotp(OTP);
  };

  const submitOtp = () => {
    const number = formValues.phone;
    verify_otp(number, storeOTP).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        setCheck(true);
      } else {
        toast.error(res.data.message);
        setCheck(false);
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(55555555);

    setFormErrors(validate(formValues));

    setSubmit(true);
    if (isCheck) {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        setLoading(true);

        signup(formValues).then((res) => {
          if (res.data.status) {
            setLoading(false);
            setSubmit(true);
            toast.success("success");
            navigate("/login");
          } else {
            seterrorMessage(res.data.message);
            toast.error(res.data.message);
            setSubmit(false);
          }
        });
      }
    } else {
      toast.error("OTP NOT VERIFIED");
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
      // } else if (regex.test(values.email)) {
      //   errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    if (values.password.length < 6) {
      errors.password = "password must be more than six character";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    }
    if (values.phone.length > 10 || values.phone.length < 10) {
      errors.phone = "enter a valid number";
    }
    if (!values.class) {
      errors.class = "enter a class";
    }
    if (!values.address) {
      errors.address = "enter address";
    }
    if (!values.city) {
      errors.city = "enter your nearest city";
    }

    console.log(errors);

    return errors;
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {isLoading && <Spinner />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <ToastContainer position="top-center" autoClose={3000} />

          <div className="text-center mb-8">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            >
              Join Our Learning Community
            </motion.h1>
            <p className="text-gray-600">
              Start your educational journey in just a few steps
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-2" /> Full Name
                </label>
                <input
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    formErrors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMail className="mr-2" /> Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    formErrors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="john@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiHome className="mr-2" /> Address
                </label>
                <input
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    formErrors.address
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="Street Address"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm">{formErrors.address}</p>
                )}
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMapPin className="mr-2" /> City
                </label>
                <input
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    formErrors.city
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="Your City"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
              </div>

              {/* Phone & OTP Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiPhone className="mr-2" /> Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                      formErrors.phone
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:ring-blue-200"
                    }`}
                    placeholder="+1 234 567 890"
                  />
                  <button
                    type="button"
                    onClick={handleOtp}
                    className="px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                  >
                    Send OTP
                  </button>
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}

                {otp && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 mt-2"
                  >
                    <input
                      onChange={handleChangeotp}
                      placeholder="Enter OTP"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={submitOtp}
                      className={`px-4 rounded-lg transition-colors ${
                        isCheck
                          ? "bg-green-500 text-white cursor-default"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {isCheck ? "Verified ✓" : "Verify"}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Class Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Grade/Class
                </label>
                <div className="relative">
                  <select
                    name="class"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border appearance-none focus:outline-none focus:ring-2 ${
                      formErrors.class
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:ring-blue-200"
                    }`}
                  >
                    <option value="">Select Your Class</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Grade {i + 1}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
                </div>
                {formErrors.class && (
                  <p className="text-red-500 text-sm">{formErrors.class}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiLock className="mr-2" /> Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="••••••••"
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Create Free Account
            </motion.button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
