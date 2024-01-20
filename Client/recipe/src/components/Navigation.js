import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import LogoutInfoPage from "./Auth/LogoutInfoPage";



export const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };
  
  return (
    <div className="relative w-full bg-white">
     <div className="flex w-full items-center justify-between px-0 py-3 sm:px-6 lg:px-8">
   <ul className="pl-0">
        <ul class="inline-flex space-x-8">
          <li>
            <Link to="/" className="text-lg font-bold text-blue-900  hover:text-blue-800 no-underline">
              Recipe Book
            </Link>
          </li>
          <li>
            <Link to="/recipe" class="text-lg font-semibold  text-blue-900  hover:text-blue-800 no-underline">
              Recipe
            </Link>
          </li>
          <li>
            <Link to="/" class="text-lg font-semibold  text-blue-900  hover:text-blue-800 no-underline">Favourite recipe
            </Link>
          </li>
          <li>
            <Link to="/newrecipe" class="text-lg font-semibold text-blue-900  hover:text-blue-800 no-underline">Add Recipe
            </Link>
          </li>
          <li>
            <Link to="/myrecipe" class="text-lg font-semibold  text-blue-900  hover:text-blue-800 no-underline">
              My Recipe
            </Link>
          </li>
        </ul>
        </ul>
        <div className="lg:block pr-5">
          {isLogin ? (
            <>
              <Link
                to="/logout"
                onClick={handleLogoutClick}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Logout &#10140;
              </Link>

              {showLogoutConfirmation &&  <LogoutInfoPage/> }
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 text-blue-900  hover:text-blue-800 font-bold ml-2 no-underline">
                Login
              </Link>
              <Link to="/signup" className="rounded-md px-3 py-2 text-white font-semibold ml-2 bg-blue-700 hover:bg-blue-600 no-underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
