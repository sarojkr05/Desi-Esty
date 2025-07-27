import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { getCartDetails, selectTotalQuantity } from "../redux/CartSlice";

import { openLoginModal } from "../redux/modalSlice";
import { useEffect, useState } from "react";
import LayoutPresentation from "./LayoutPresentation";
import axiosInstance from "../helpers/axiosInstance";
import { fetchCurrentUser } from "../redux/userSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [userOptions, setUserOptions] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginModalOpen = useSelector((state) => state.modal.loginModalOpen);
  const totalQuantity = useSelector(selectTotalQuantity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const registerModalOpen = useSelector(
    (state) => state.modal.registerModalOpen
  );

  useEffect(() => {
    if (location.state?.forceLogin) {
      dispatch(openLoginModal());
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartDetails());
    }
  }, [dispatch, isLoggedIn]);
  // fetch current user to see if user is logged in
  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then((res) => dispatch(fetchCurrentUser(res.data)))
      .catch(() => dispatch(logout()));
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      setUserOptions(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserOptions = () => {
    setUserOptions(!userOptions);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const showUserProfile = () => {
    navigate("/user-profile");
  };

  return (
    <LayoutPresentation
      isLoggedIn={isLoggedIn}
      loginModalOpen={loginModalOpen}
      totalQuantity={totalQuantity}
      registerModalOpen={registerModalOpen}
      handleLogout={handleLogout}
      handleUserOptions={handleUserOptions}
      handleMobileMenuToggle={handleMobileMenuToggle}
      showUserProfile={showUserProfile}
      userOptions={userOptions}
      setMobileMenuOpen={setMobileMenuOpen}
      mobileMenuOpen={mobileMenuOpen}
    />
  );
};

export default Layout;
