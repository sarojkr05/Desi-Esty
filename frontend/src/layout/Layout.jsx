import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
} from "../redux/modalSlice";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginModalOpen = useSelector((state) => state.modal.loginModalOpen);
  const registerModalOpen = useSelector(
    (state) => state.modal.registerModalOpen
  );

  useEffect(() => {
    if (location.state?.forceLogin) {
      dispatch(openLoginModal());
    }
  }, [location.state, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-amber-600 font-bold text-xl"
          >
            <ShoppingBag className="w-6 h-6" />
            Desi Etsy
          </Link>

          {/* Nav Links */}
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
              <Link to="/cart" className="hover:text-amber-600 transition">
                <ShoppingCart size={22} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
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
