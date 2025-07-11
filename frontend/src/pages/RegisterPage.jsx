import { useState } from "react";
import { Mail, Eye, EyeOff, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-[#FAF3E0] ">
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] flex flex-col items-center justify-center p-10 bg-[#FAF3E0]/80 shadow-xl rounded-xl backdrop-blur-lg">
        <h2 className="text-2xl pb-4 font-bold text-amber-600">Register</h2>
        <p className="text-sm text-gray-600 italic mb-4 text-center">
          Join the Desi Esty family — where craft meets culture.
        </p>

        <div className=" w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2">
          <User className="text-amber-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full flex-1 outline-none bg-transparent text-gray-700"
          />
        </div>

        <div className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2">
          <Mail className="text-amber-500 mr-2" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 outline-none bg-transparent text-gray-700"
          />
        </div>
        <div className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2">
          <Lock className="text-amber-500 mr-2" size={18} />
          <input
            className="flex-1 outline-none bg-transparent text-gray-700"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
          />
          {showPassword ? (
            <EyeOff
              size={18}
              className="text-amber-500 cursor-pointer ml-2"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              size={18}
              className="text-amber-500 cursor-pointer ml-2"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <button className="p-2 m-2 w-1/2 rounded-lg font-bold bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition duration-300">
          Submit
        </button>

        <p className="text-sm mt-2   font-semibold">
          Already a user ? 
          <span
            onClick={handleLogin}
            className="text-gray-700  font-bold cursor-pointer hover:text-amber-500"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;