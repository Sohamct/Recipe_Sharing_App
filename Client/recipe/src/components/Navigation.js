import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FilterRecipe } from "./Recipes/FilterRecipe/FilterRecipe";
// import { fetchUserDetails } from "../app/service/userApi";
import { useUser } from "../features/context";
import './style.css'

export const Navigation = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedSection, setSelectedSection] = useState('home'); 
  const { user } = useUser();
  const location = useLocation();


  useEffect(() => {
    const path = location.pathname;
    if (path === '/recipe') {
      setSelectedSection('recipe');
    } else if (path === '/favorite') {
      setSelectedSection('favorite');
    } else if (path === '/myrecipe') {
      setSelectedSection('myrecipe');
    } else if (path === '/newrecipe') {
      setSelectedSection('newrecipe');
    } else if (path === '/chat') {
      setSelectedSection('chat');
    }
  }, [location.pathname]);

  const handleFilter = (filterOptions) => {
    console.log(filterOptions);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar-fixed">
      <div className="relative w-full bg-white">
        <div className="flex w-full items-center justify-between px-0 py-0 mt-0">
          <ul className="pl-4 mt-3">
            <ul className="inline-flex space-x-5">
              <li>
                <Link
                  className={`text-lg font-bold text-gray-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-gray-700 no-underline ${selectedSection === 'home' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : ''}`}
                >
                  CookCraft 🧑‍🍳
                </Link>
              </li>
              <li>
                <Link
                  to="/recipe"
                  className={`text-lg font-semibold text-blue-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-blue-800 no-underline ${selectedSection === 'recipe' ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white' : ''}`}
                  onClick={() => setSelectedSection('recipe')}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/favorite"
                  className={`text-lg font-semibold text-blue-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-blue-800 no-underline ${selectedSection === 'favorite' ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white' : ''}`}
                  onClick={() => setSelectedSection('favorite')}
                >
                  Favorite recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/myrecipe"
                  className={`text-lg font-semibold text-blue-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-blue-800 no-underline ${selectedSection === 'myrecipe' ? 'bg-gradient-to-r from-pink-400 via-red-500 to-yellow-600 text-white' : ''}`}
                  onClick={() => setSelectedSection('myrecipe')}
                >
                  My recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/newrecipe"
                  className={`text-lg font-semibold text-blue-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-blue-800 no-underline ${selectedSection === 'newrecipe' ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-white' : ''}`}
                  onClick={() => setSelectedSection('newrecipe')}
                >
                  Add recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className={`text-lg font-semibold text-blue-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-blue-800 no-underline ${selectedSection === 'chat' ? 'bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white' : ''}`}
                  onClick={() => setSelectedSection('chat')}
                >
                  Chat
                </Link>
              </li>
            </ul>
          </ul>
          {selectedSection === 'recipe' && <FilterRecipe onFilter={handleFilter} /> }
          
          <div className="flex items-center">
            <div className="lg:block pr-5">
              
                <div className="relative group" onClick={handleDropdownClick}>
                  <div className={`mx-2 w-9 h-9 rounded-full bg-blue-900 hover:bg-blue-800 transition duration-300 ease-in-out flex items-center justify-center cursor-pointer group ${showDropdown ? 'border-3 rounded-full border-gray-400' : ''}`}>
                    {user && user.firstname && user.lastname && (
                      <div>
                        <span className="text-md font-medium text-white">{user.firstname.charAt(0)}{user.lastname.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  {showDropdown && (
                    <div className="absolute right-0 z-10 mt-2 py-2 w-32 text-sm font-medium bg-white rounded-lg shadow-lg">
                      <Link to="/logout" className="block px-4 no-underline py-2 text-gray-600 hover:text-blue-900">
                        Logout
                      </Link>
                      <Link to={`/user-profile/${user?.username}`} className="block no-underline px-4 py-2 text-gray-600 hover:text-blue-900">
                        Your Profile
                      </Link>
                    </div>
                  )}
                </div>
            </div>
          </div>
          
          </div>
      </div>
    </div>
  );
};


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FilterRecipe } from "./Recipes/FilterRecipe/FilterRecipe";
// import { fetchUserDetails } from "../app/service/userApi";
// import { useUser } from "../features/context";

// export const Navigation = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [selectedSection, setSelectedSection] = useState('home'); 
//   const { user } = useUser();
//   const location = useLocation();

//   useEffect(() => {
//     const path = location.pathname;
//     if (path === '/') {
//       setSelectedSection('home');
//     } else if (path === '/recipe') {
//       setSelectedSection('recipe');
//     } else if (path === '/favorite') {
//       setSelectedSection('favorite');
//     } else if (path === '/myrecipe') {
//       setSelectedSection('myrecipe');
//     } else if (path === '/newrecipe') {
//       setSelectedSection('newrecipe');
//     } else if (path === '/chat') {
//       setSelectedSection('chat');
//     }
//   }, [location]);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const user = await fetchUserDetails();
//         setUserDetails(user.user);
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setIsLoggedIn(false);
//       }
//     };

//     getUserData();
//   },[user?.username]);

//   const handleFilter = (filterOptions) => {
//     console.log(filterOptions);
//   };

//   const handleDropdownClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
//       <div className="relative w-full bg-white">
//         <div className="flex w-full items-center justify-between px-0 py-1 mt-0">
//           <ul className="pl-7 mt-3">
//             <ul className="inline-flex space-x-8">
//               <li>
//                 <Link
//                   to="/"
//                   className={`text-lg font-bold text-gray-900 transition duration-300 ease-in-out rounded-md px-2 py-1.5 hover:text-gray-700 no-underline ${selectedSection === 'home' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : ''
//                     }`}
//                   onClick={() => setSelectedSection('home')}
//                 >
//                   CookCraft 🧑‍🍳
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/recipe"
//                   className={`text-lg font-semibold text-blue-900 hover:text-blue-800 no-underline ${selectedSection === 'recipe' ? 'underline' : ''
//                     }`}
//                 >
//                   DashBoard
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/favorite"
//                   className={`text-lg font-semibold text-blue-900 hover:text-blue-800 no-underline ${selectedSection === 'favorite' ? 'underline' : ''
//                     }`}
//                   onClick={() => setSelectedSection('favorite')}
//                 >
//                   Favorite recipe
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/myrecipe"
//                   className={`text-lg font-semibold text-blue-900 hover:text-blue-420 hover:bg-blue-180 no-underline ${selectedSection === 'myrecipe' ? 'bg-blue-200 rounded-lg underline' : ''}`}
//       onClick={() => setSelectedSection('myrecipe')}
//                 >
//                   My Recipe
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/newrecipe"
//                   className={`text-lg font-semibold text-blue-900 hover:text-blue-800 no-underline ${selectedSection === 'newrecipe' ? 'underline' : ''
//                     }`}
//                   onClick={() => setSelectedSection('newrecipe')}
//                 >
//                   Add Recipe
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/chat"
//                   className={`text-lg font-semibold text-blue-900 hover:text-blue-800 no-underline ${selectedSection === 'newrecipe' ? 'underline' : ''
//                     }`}
//                 >
//                   Chat
//                 </Link>
//               </li>
//             </ul>
//           </ul>
          
//           <FilterRecipe onFilter={handleFilter} />
          
//           <div className="flex items-center">
//             <div className="lg:block pr-5">
//               {isLoggedIn ? (
//                 <div className="relative group" onClick={handleDropdownClick}>
//                   <div className={`mx-2 w-9 h-9 rounded-full bg-blue-900 hover:bg-blue-800 transition duration-300 ease-in-out flex items-center justify-center cursor-pointer group ${showDropdown ? 'border-3 rounded-full border-gray-400' : ''}`}>
//                     {isLoggedIn && userDetails && userDetails.firstname && userDetails.lastname && (
//                       <div>
//                         <span className="text-md font-medium text-white">{userDetails.firstname.charAt(0)}{userDetails.lastname.charAt(0)}</span>
//                       </div>
//                     )}
//                   </div>
//                   {showDropdown && (
//                     <div className="absolute right-0 z-10 mt-2 py-2 w-32 text-sm font-medium bg-white rounded-lg shadow-lg">
//                       <Link to="/logout" className="block px-4 no-underline py-2 text-gray-600 hover:text-blue-900">
//                         Logout
//                       </Link>
//                       <Link to={`/user-profile/${user?.username}`} className="block no-underline px-4 py-2 text-gray-600 hover:text-blue-900">
//                         Your Profile
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="rounded-md px-3 text-blue-900 hover:text-blue-800 font-bold ml-2 no-underline"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="rounded-md px-3 py-2 text-white font-semibold ml-2 bg-blue-700 hover:bg-blue-600 no-underline"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };