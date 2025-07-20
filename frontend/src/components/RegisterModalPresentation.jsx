import { Mail, Eye, EyeOff, Lock, User, X, Phone } from "lucide-react";
import { motion } from "framer-motion";

const RegisterModalPresentation = ({
  showPassword,
  setRole,
  fadeUp,
  staggerContainer,
  containerVariants,
  handleChange,
  handleLogin,
  handleFormSubmit,
  onClose,
  formData,
  role,
  setShowPassword
}) => {
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

export default RegisterModalPresentation;