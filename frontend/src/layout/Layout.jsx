import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Toaster } from "react-hot-toast";
import { selectTotalQuantity } from "../redux/CartSlice";
import { Menu } from "lucide-react";

import {
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
} from "../redux/modalSlice";
import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";

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
  const showUserProfile = () => {
    navigate("/user-profile");
  };

  return (
    <>
      <Toaster reverseOrder={false} />

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-amber-600 font-bold text-xl"
          >
            <ShoppingBag className="w-6 h-6" />
            Desi Etsy
          </Link>

          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-amber-600 transition duration-200"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Toggle Menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>

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
                        <li
                          onClick={showUserProfile}
                          className="px-4 py-2 hover:bg-amber-100 cursor-pointer"
                        >
                          Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-amber-100 cursor-pointer">
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
                  <ShoppingCart
                    size={24}
                    className="text-gray-700 hover:text-amber-600 transition duration-200"
                  />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-md px-4 py-6 space-y-4 text-gray-700 font-medium z-40 absolute top-[64px] left-0 w-full">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-amber-600 transition"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-amber-600 transition"
              >
                Products
              </Link>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block hover:text-amber-600 transition"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      showUserProfile();
                      setMobileMenuOpen(false);
                    }}
                    className="block hover:text-amber-600 transition"
                  >
                    Profile
                  </button>
                  <Link
                    to="/my-cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block relative hover:text-amber-600 transition"
                  >
                    <ShoppingCart className="absolute top-5 left-1" />
                    {totalQuantity > 0 && (
                      <span className="ml-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      dispatch(openLoginModal());
                      setMobileMenuOpen(false);
                    }}
                    className="block hover:text-amber-600 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      dispatch(openRegisterModal());
                      setMobileMenuOpen(false);
                    }}
                    className="block hover:text-amber-600 transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
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
};

export default Layout;