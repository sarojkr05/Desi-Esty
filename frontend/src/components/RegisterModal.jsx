import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import toast from "react-hot-toast";
import RegisterModalPresentation from "./RegisterModalPresentation";

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
    <RegisterModalPresentation 
      showPassword={showPassword}
      setRole={setRole}
      handleLogin={handleLogin}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
      containerVariants={containerVariants}
      staggerContainer={staggerContainer}
      fadeUp={fadeUp}
      onClose={onClose}
      formData={formData}
      role={role}
      setShowPassword={setShowPassword}
    />
  );
};

export default RegisterModal;