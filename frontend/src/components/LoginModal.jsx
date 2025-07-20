import { useEffect, useState } from "react";
import { Mail, Eye, EyeOff, Lock, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { closeLoginModal } from "../redux/modalSlice";
import toast from "react-hot-toast";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = () => onSwitchToRegister();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setShowPassword(false); // optional: reset password visibility too
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!isOpen) return null;

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error("Both email and password are required!");
        return;
      }

      //check email
      if (!formData.email.includes("@") || !formData.email.includes(".")) {
        toast.error("Please enter a valid email address!");
        return;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters and inludes uppercase, lowercase, number and special character!"
        );
        return;
      }

      const response = await dispatch(loginUser(formData));

      if (response.type === "/auth/signin/fulfilled") {
        const role = response.payload.user.role;

        //Close the modal on successful login

        dispatch(closeLoginModal());

        //Navigate accordingly

        if (role === "artisan") {
          navigate("/dashboard/artisan");
        } else if (role === "admin") {
          navigate("/dashboard/admin");
        } else {
          onClose();
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white w-[90%] sm:w-[500px] rounded-xl p-6 shadow-lg relative"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-400"
        >
          <X />
        </button>

        <motion.h2
          className="text-2xl font-bold text-amber-600 mb-1 text-center"
          variants={fadeUp}
        >
          Login
        </motion.h2>

        <motion.p
          className="text-sm text-center text-gray-600 mb-6"
          variants={fadeUp}
        >
          Your gateway to all things desi &amp; delightful ✨
        </motion.p>

        {/* Email Field */}
        <motion.div
          className="flex items-center gap-2 border border-amber-200 rounded-lg bg-white px-4 py-2 mb-4 shadow-sm"
          variants={fadeUp}
        >
          <Mail className="text-amber-500" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your E-mail here"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="flex items-center gap-2 border border-amber-200 rounded-lg bg-white px-4 py-2 mb-4 shadow-sm"
          variants={fadeUp}
        >
          <Lock className="text-amber-500" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent text-gray-700"
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <EyeOff
              className="text-amber-500 cursor-pointer"
              size={18}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="text-amber-500 cursor-pointer"
              size={18}
              onClick={() => setShowPassword(true)}
            />
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          onClick={handleFormSubmit}
          className="w-full mt-2 py-2 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition shadow-md"
          variants={fadeUp}
        >
          Login
        </motion.button>

        {/* Switch to Register */}
        <motion.p className="text-sm mt-4 text-center" variants={fadeUp}>
          New to Desi Etsy?{" "}
          <span
            onClick={handleRegister}
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
