import React, { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../constants/constants";
import GoogleButton from "react-google-button";
import { setStudent } from "../../Store/Slice/student_slice";
import { useDispatch } from "react-redux";
import { useSocket } from "../../contex/socketProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState("");

  const googleAuth = () => {
    const apiUrl = `${baseUrl}/auth/google/callback`;
    window.open(apiUrl, "_self");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      axios.post("/login", { formValues }).then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          dispatch(
            setStudent({
              name: res.data.result.name,
              email: res.data.result.email,
              _id: res.data.result._id,
              image: res.data.result.image,
              isLoggedIn: true,
              token: res.data.token,
            })
          );
          socket.emit("student:initial-connection", { student_id: res.data.result._id });
          navigate("/");
        } else {
          setErrorMessage(res.data.message);
          toast.error(res.data.message);
        }
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mycolors">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center font-medium">{errorMessage}</div>
        )}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              onChange={handleChange}
              value={formValues.email}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-indigo-300"
              onChange={handleChange}
              value={formValues.password}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <GoogleButton onClick={googleAuth} />
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account? 
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
