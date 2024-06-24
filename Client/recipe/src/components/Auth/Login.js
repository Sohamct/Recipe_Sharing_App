import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import AuthService from "./Auth.service";
import './login.css'
import { useUser } from "../../features/context";


export const Login = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {setUser} = useUser();

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
    if(isButtonDisabled) return ;
    setIsButtonDisabled(true);

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const loginResponse = await AuthService.login(username, password);
      if (loginResponse.success) {
        console.log(loginResponse.user);
        setUser(loginResponse.user);
        // setUserdetails(loginResponse.user)
        notify();
        navigate("/recipe");
      } else {
        // console.log(loginResponse.message);
        toast.error(loginResponse.message, {
          autoClose: 1500,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message || "Erjlkbagr");
    }
    finally{
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000)
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleClick}
        className="w-full max-w-md sm:w-2/3 md:w-1/3 shadow-sm p-6 sm:p-12 border-2 mx-4 my-16 sm:my-32 text-black rounded-lg bg-opacity-80 bg-white">
        <p className="my-3 font-semibold text-xl sm:text-2xl md:text-3xl">Login To Continue Recipe Book</p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border-2 my-2 sm:my-4 w-full rounded-lg block"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border-2 my-2 sm:my-4 w-full rounded-lg block"
        />
        <button type="submit" 
          className="p-2 border-2 my-2 sm:my-3 text-white font-semibold bg-blue-700 w-full rounded-lg block button"
          disabled={isButtonDisabled}>
          {isButtonDisabled ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-4">
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