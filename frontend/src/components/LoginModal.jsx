import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { closeLoginModal } from "../redux/modalSlice";
import toast from "react-hot-toast";
import LoginModalPresentation from "./LoginModalPresentation";
import { getCartDetails } from "../redux/CartSlice";

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
      setShowPassword(false);
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
        dispatch(getCartDetails()) // Fetch the cart everytime a user logged in

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
    <LoginModalPresentation 
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleRegister={handleRegister}
      formData={formData}
      onClose={onClose}
      handleChange={handleChange}
      containerVariants={containerVariants}
      staggerContainer={staggerContainer}
      handleFormSubmit={handleFormSubmit}
      fadeUp={fadeUp}
    />
  )
};

export default LoginModal;