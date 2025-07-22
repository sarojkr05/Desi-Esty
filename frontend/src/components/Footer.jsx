import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-amber-600 mb-3">Desi Etsy</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Celebrating local craftsmanship — shop handmade treasures from artisans across India.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-amber-600 transition">Products</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-amber-600 transition">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-amber-600 transition">Register</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-600 transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-amber-600 transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-amber-600 transition" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-100 px-4">
        &copy; {new Date().getFullYear()} Desi Etsy. All rights reserved.
        &nbsp; <Link to="/terms" className="hover:text-amber-600 transition">Terms of Service</Link>
        &nbsp; <Link to="/privacy" className="hover:text-amber-600 transition">Privacy Policy</Link>
        &reg;
      </div>
    </footer>
  );
};

export default Footer;
