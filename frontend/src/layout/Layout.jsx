import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Footer from "../components/Footer";

const Navbar = ({ children }) => {
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
            <Link to="/login" className="hover:text-amber-600 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-amber-600 transition">
              Register
            </Link>
          </div>
        </div>
      </nav>
      <main className="min-h-screen bg-gradient-to-br from-white to-amber-50 text-gray-800">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Navbar;
