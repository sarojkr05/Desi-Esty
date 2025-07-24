import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { selectTotalQuantity } from "../redux/CartSlice";

import {
  openLoginModal,
} from "../redux/modalSlice";
import { useEffect, useState } from "react";
import LayoutPresentation from "./LayoutPresentation";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [userOptions, setUserOptions] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginModalOpen = useSelector((state) => state.modal.loginModalOpen);
<<<<<<< HEAD
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
=======
  const totalQuantity = useSelector(selectTotalQuantity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

>>>>>>> 97d45a6c12f416de7b0f9966fbeaf93171787895
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
<<<<<<< HEAD
  const showUserProfile =()=>{
    navigate('/user-profile');
  }
  
  return (
    <>
      <Toaster  reverseOrder={false} />

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-amber-600 font-bold text-xl"
          >
            <ShoppingBag className="w-6 h-6" />
            Desi Etsy
          </Link>

          <div className="hidden md:flex gap-6 items-center font-medium text-gray-700">
            <Link to="/" className="hover:text-amber-600 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-amber-600 transition">
              Products
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-amber-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => dispatch(openLoginModal())}
                  className="hover:text-amber-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => dispatch(openRegisterModal())}
                  className="hover:text-amber-600 transition"
                >
                  Register
                </button>
              </>
            )}
            {isLoggedIn && (
              <>
               <div className="relative">
                  <User
                    size={22}
                    onClick={handleUserOptions}
                    className="hover:text-amber-600 transition cursor-pointer"
                  />
                  {userOptions && (
                    <div className="absolute top-10 -left-6 w-56 rounded-md shadow-md z-50 bg-[#FFFFFF]">
                      <div className="flex justify-between items-center px-3 py-2 border-b border-amber-300 ">
                        <span className="text-sm font-semibold text-gray-700">
                          Menu
                        </span>
                        <X
                          size={18}
                          className="text-amber-500 cursor-pointer"
                          onClick={handleUserOptions}
                        />
                      </div>

                      <ul className="text-sm text-gray-700 divide-y divide-amber-100">
                        <li onClick={showUserProfile}
                        className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                          Profile
                        </li>
                        <li 
                        
                        className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
                          My Orders
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:bg-amber-100 cursor-pointer text-amber-500"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                  
                </div>
                 <Link to="/my-cart" className="relative group">
                 <ShoppingCart size={24} className="text-grey-700 hover:text-amber-600 transition duration-200"/>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalQuantity}
                  </span>
                  )}
                 </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => dispatch(closeLoginModal())}
        onSwitchToRegister={() => {
          dispatch(closeLoginModal());
          dispatch(openRegisterModal());
        }}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => dispatch(closeRegisterModal())}
        onSwitchToLogin={() => {
          dispatch(closeRegisterModal());
          dispatch(openLoginModal());
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-white to-amber-50 text-gray-800">
        <Outlet />
      </main>
      <Footer />
    </>
  );
=======

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
    />
  )
>>>>>>> 97d45a6c12f416de7b0f9966fbeaf93171787895
};

export default Layout;
