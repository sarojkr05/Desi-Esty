import { useEffect, useState } from "react";
import { Mail, Eye, EyeOff, Lock, User, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const handleLogin = () => onSwitchToLogin();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  useEffect(() => {
      if (isOpen) {
        setFormData({ name: "", email: "", password: "", mobileNumber: "" });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, role };

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobileNumber ||
        !formData.password
      ) {
        toast.error("All fields are required!");
        return;
      }
      //check email
      if (!formData.email.includes("@") || !formData.email.includes(".")) {
        toast.error("Please enter a valid email address!");
        return;
      }

      if (
        formData.mobileNumber.length < 10 ||
        formData.mobileNumber.length > 10
      ) {
        toast.error("Mobile number must not be more than 10 digits long!");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      if(!passwordRegex.test(formData.password)) {
        toast.error("Password must be at least 8 characters and inludes uppercase, lowercase, number and special character!")
        return;
      }

      const response = await dispatch(registerUser(finalData));

      if (response.type === "/auth/register/fulfilled") {
        onClose();
        onSwitchToLogin(); // Open login modal
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  if (!isOpen) return null;

  // Framer motion variants
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
        {/* Close button */}
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
          Register
        </motion.h2>

        <motion.p
          className="text-sm text-gray-600 italic mb-4 text-center"
          variants={fadeUp}
        >
          Join the Desi Etsy family — where craft meets culture.
        </motion.p>

        <motion.div
          className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2"
          variants={fadeUp}
        >
          <User className="text-amber-500 mr-2" size={18} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </motion.div>

        <motion.div
          className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2"
          variants={fadeUp}
        >
          <Mail className="text-amber-500 mr-2" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter you E-mail here"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </motion.div>

        <motion.div
          className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2"
          variants={fadeUp}
        >
          <Phone className="text-amber-500 mr-2" size={18} />
          <input
            type="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter you 10 digits mobile Number"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </motion.div>

        <motion.div
          className="w-full flex items-center border border-amber-200 rounded-lg bg-white px-3 py-2 my-2"
          variants={fadeUp}
        >
          <Lock className="text-amber-500 mr-2" size={18} />
          <input
            name="password"
            className="flex-1 outline-none bg-transparent text-gray-700"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
        </motion.div>

        <motion.div className="mb-4" variants={fadeUp}>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Register as:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="user">User (Shopper)</option>
            <option value="artisan">Artisan (Seller)</option>
          </select>
        </motion.div>

        <motion.button
          onClick={handleFormSubmit}
          className="w-full mt-2 py-2 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition shadow-md"
          variants={fadeUp}
        >
          Submit
        </motion.button>

        <motion.p className="text-sm mt-4 text-center" variants={fadeUp}>
          Already have an account?{" "}
          <span
            onClick={handleLogin}
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterModal;
