import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import AuthService from "./Auth.service";


export const Signup = () => {
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const cpassword = e.target.elements.cpassword.value;
    const email = e.target.elements.email.value;
    const firstname = e.target.elements.firstname.value;
    const lastname = e.target.elements.lastname.value;
    const gender = e.target.elements._gender.value;
    const isPrivate = e.target.elements.isPrivate.value === "private";


    if (password !== cpassword) {
      toast.error("Password doesn't match with conform password");
      return;
    }
    console.log(
      username,
      password,
      email,
      firstname,
      lastname,
      gender,
      isPrivate
    );


    const signupResponse = await AuthService.signup(
      username,
      password,
      email,
      firstname,
      lastname,
      gender,
      isPrivate
    );


    if (signupResponse.success) {
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/recipe");
    } else {
      toast.error(signupResponse.message, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      alert('You are already logged in');
      navigate('/');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/2 bg-white border rounded p-8 shadow-md">
        <h2 className="my-2 mt-2 text-center text-2xl font-bold">
          Create an Account to use Recipe Book
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="my-2">
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Firstname
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="firstname"
              name="firstname"
              placeholder="Enter FirstName"
            />
          </div>


          <div className="my-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Lastname
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="lastname"
              name="lastname"
              placeholder="Enter LastName"
            />
          </div>


          <div className="my-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="username"
              name="username"
              placeholder="Enter Username"
            />
          </div>


          <div className="my-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="email"
              name="email"
              placeholder="Enter Email address"
            />
          </div>


          <div className="my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              id="password"
              name="password"
              placeholder="Password"
              minLength={5}
              required
            />
          </div>


          <div className="my-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              minLength={5}
              required
            />
          </div>


          <div className="my-2">
            <label className="mr-2">Select Gender:</label>
            <div className="flex">
              <input
                className="mr-2"
                type="radio"
                name="_gender"
                id="female"
                value="female"
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="flex">
              <input
                className="mr-2"
                type="radio"
                name="_gender"
                id="male"
                value="male"
              />
              <label htmlFor="male">Male</label>
            </div>
          </div>


          <div className="my-2">
            <label className="mr-2">Select Account type:</label>
            <div className="flex">
              <input
                className="mr-2"
                type="radio"
                name="isPrivate"
                id="private"
                value="private"
              />
              <label htmlFor="private">Private</label>
            </div>
            <div className="flex">
              <input
                className="mr-2"
                type="radio"
                name="isPrivate"
                id="public"
                value="public"
              />
              <label htmlFor="public">Public</label>
            </div>
          </div>


          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded my-2 col-span-2 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Signup
          </button>
        </form>
        <div className="text-center">
              Already registered ?{" "}
              <span
                onClick={()=>navigate('/login')}
                className="text-red-600 font-semibold decoration-red-600 hover:text-red-800 hover:underline cursor-pointer">
                Login now
              </span>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};