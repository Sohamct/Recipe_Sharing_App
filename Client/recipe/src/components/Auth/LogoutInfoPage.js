import React , {useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginInfoPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false); 
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="login-info-page">
      <div className="w-1/3 shadow-sm absolute p-16 border-2 mx-auto my-36 right-0 left-0 text-black rounded-lg bg-opacity-80">
        <p className="my-3 font-semibold text-3xl">Logout from Recipe Book</p>
        <p>Are you sure you want to logout from this app ?</p>
        <div className="my-6 flex space-x-4">
          <button onClick={handleLogout} className="p-2.5 border-2 text-white font-semibold bg-blue-700 w-1/2 rounded-lg">
            Logout
          </button>
          <button onClick={handleCancel} className="p-2.5 border-2 text-black font-semibold bg-gray-200 w-1/2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginInfoPage;
