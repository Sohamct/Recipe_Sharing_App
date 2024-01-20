import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import AuthService from "./Auth.service";


export const Login = () => {
  const notify = () =>
    toast.success("Logged in successfully!", {
      autoClose: 2000,
      theme: "colored",
    });
  const navigate = useNavigate();

  const gotoSignupPage = () => {
    navigate('/signup');
  }


  const handleClick = async (e) => {
    e.preventDefault();
    console.log("working...");
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    console.log(username + password);
    try {
      const loginResponse = await AuthService.login(username, password);
      if (loginResponse.success) {
        console.log(loginResponse.message);
        notify();
        navigate("/");
      } else {
        console.log(loginResponse.message);
        toast.error(loginResponse.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message || "Erjlkbagr");
    }
  };


  return (
    <div>
      <form
        onSubmit={handleClick}
        className="w-1/3 shadow-sm absolute p-12 border-2 mx-auto my-32 right-0 left-0 text-black rounded-lg bg-opacity-80">
        <p className="my-3 font-semibold text-3xl">Login To Continue Recipe Book</p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2.5 border-2 my-4 w-full rounded-lg block"
        />
        <input
          type="password"
          name="password"
          placeholder="Password "
          className="p-2.5 border-2 my-4 w-full rounded-lg block"
        />
        <button type="submit" className="p-2.5 border-2 my-3 text-white font-semibold bg-blue-700 w-full rounded-lg block">
          Login
        </button>
        <div className="text-center">
              Not registered ?{" "}
              <span
                onClick={gotoSignupPage}
                className="text-red-600 font-semibold decoration-red-600 hover:text-red-800 hover:underline cursor-pointer">
                Sign Up now
              </span>
        </div>
      </form>
    </div>
  );
};


