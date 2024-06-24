
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "./Auth.service";

export const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const cpassword = formData.get('cpassword');
    const email = formData.get('email');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const gender = formData.get('_gender');
    const profilePic = formData.get('profilePic');
    const instagramHandle = formData.get('instagramHandle');
    const linkedinHandle = formData.get('linkedinHandle');
    const twitterHandle = formData.get('twitterHandle');

    if (password !== cpassword) {
      toast.error("Password doesn't match with conform password");
      return;
    }

    const signupResponse = await AuthService.signup(
      username,
      password,
      email,
      firstname,
      lastname,
      gender,
      profilePic,
      instagramHandle,
      linkedinHandle,
      twitterHandle
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
      navigate("/login");
    } else {
      toast.error(signupResponse.message, {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex items-center justify-center my-5">
      <div className="w-[35rem] bg-white border rounded shadow-md">
        <h2 className="my-2 mt-5 text-center text-2xl font-bold">
          Create an Account to use Recipe Book
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-4">
          <div className="my-3">
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

          <div className="my-3">
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

          <div className="my-3">
            <label
              htmlFor="username"
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

          <div className="my-3">
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

          <div className="my-3">
            <label
              htmlFor="instagramHandle"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Instagram Handle
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="instagramHandle"
              name="instagramHandle" // Updated name attribute
              placeholder="Enter Instagram handle"
            />
          </div>

          <div className="my-3">
            <label
              htmlFor="linkedinHandle"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              LinkedIn Handle
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="linkedinHandle"
              name="linkedinHandle" // Updated name attribute
              placeholder="Enter LinkedIn handle"
            />
          </div>

          <div className="my-3">
            <label
              htmlFor="twitterHandle"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Twitter Handle
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              id="twitterHandle"
              name="twitterHandle" // Updated name attribute
              placeholder="Enter Twitter handle"
            />
          </div>

          <div className="my-3">
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

          <div className="my-3">
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

          <div className="my-3">
            <label className="mr-2">Gender </label>
            <div className="flex mt-2">
              <input
                className="mr-2"
                type="radio"
                name="_gender"
                id="female"
                value="female"
              />
              <label htmlFor="female">Female</label>
              <div className=" mx-3">
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

            <div className="my-3">
              <label htmlFor="profilePic" className="block text-base mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                id="profilePic"
                name="profilePic"
              />
              <small className="text-gray-500">Select an image for your profile picture.</small>
            </div>


          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded my-2 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Signup
          </button>


        </form>

        <div className="text-center mb-4">
          Already registered ?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-red-600 font-semibold decoration-red-600 hover:text-red-800 hover:underline cursor-pointer">
            Login now
          </span>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthService from "./Auth.service";

// export const Signup = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const username = formData.get('username');
//     const password = formData.get('password');
//     const cpassword = formData.get('cpassword');
//     const email = formData.get('email');
//     const firstname = formData.get('firstname');
//     const lastname = formData.get('lastname');
//     const gender = formData.get('_gender');
//     const profilePic = formData.get('profilePic');
//     const instagramHandle = formData.get('instagramHandle');
//     const linkedinHandle = formData.get('linkedinHandle');
//     const twitterHandle = formData.get('twitterHandle');

//     if (password !== cpassword) {
//       toast.error("Password doesn't match with conform password");
//       return;
//     }

//     const signupResponse = await AuthService.signup(
//       username,
//       password,
//       email,
//       firstname,
//       lastname,
//       gender,
//       profilePic,
//       instagramHandle,
//       linkedinHandle,
//       twitterHandle
//     );
//     console.log(signupResponse);

//     if (signupResponse.success) {
//       toast.success("Account created successfully", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       navigate("/login");
//     } else {
//       toast.error(signupResponse.message, {
//         autoClose: 2000,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center my-5">
//       <div className="w-[35rem] bg-white border rounded shadow-md">
//         <h2 className="my-2 mt-5 text-center text-2xl font-bold">
//           Create an Account to use Recipe Book
//         </h2>
//         <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-4">
//           <div className="my-3">
//             <label
//               htmlFor="firstname"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Firstname
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="firstname"
//               name="firstname"
//               placeholder="Enter FirstName"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="lastname"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Lastname
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="lastname"
//               name="lastname"
//               placeholder="Enter LastName"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="username"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="username"
//               name="username"
//               placeholder="Enter Username"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="email"
//               name="email"
//               placeholder="Enter Email address"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="instagramHandle"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Instagram Handle
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="instagramHandle"
//               name="instagramHandle" // Updated name attribute
//               placeholder="Enter Instagram handle"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="linkedinHandle"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               LinkedIn Handle
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="linkedinHandle"
//               name="linkedinHandle" // Updated name attribute
//               placeholder="Enter LinkedIn handle"
//             />
//           </div>

//           <div className="my-3">
//             <label
//               htmlFor="twitterHandle"
//               className="block text-sm font-semibold text-gray-600 mb-1"
//             >
//               Twitter Handle
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//               id="twitterHandle"
//               name="twitterHandle" // Updated name attribute
//               placeholder="Enter Twitter handle"
//             />
//           </div>

//           <div className="my-3">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               className="w-full p-2 border rounded"
//               id="password"
//               name="password"
//               placeholder="Password"
//               minLength={5}
//               required
//             />
//           </div>

//           <div className="my-3">
//             <label htmlFor="cpassword">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full p-2 border rounded"
//               id="cpassword"
//               name="cpassword"
//               placeholder="Confirm Password"
//               minLength={5}
//               required
//             />
//           </div>

//           <div className="my-3">
//             <label className="mr-2">Gender </label>
//             <div className="flex mt-2">
//               <input
//                 className="mr-2"
//                 type="radio"
//                 name="_gender"
//                 id="female"
//                 value="female"
//               />
//               <label htmlFor="female">Female</label>
//               <div className=" mx-3">
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   name="_gender"
//                   id="male"
//                   value="male"
//                 />
//                 <label htmlFor="male">Male</label>
//               </div>
//             </div>

//             <div className="my-3">
//               <label htmlFor="profilePic" className="block text-base mb-1">
//                 Profile Picture
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="block w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
//                 id="profilePic"
//                 name="profilePic"
//               />
//               <small className="text-gray-500">Select an image for your profile picture.</small>
//             </div>


//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded my-2 w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
//           >
//             Signup
//           </button>


//         </form>

//         <div className="text-center mb-4">
//           Already registered ?{" "}
//           <span
//             onClick={() => navigate('/login')}
//             className="text-red-600 font-semibold decoration-red-600 hover:text-red-800 hover:underline cursor-pointer">
//             Login now
//           </span>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };
