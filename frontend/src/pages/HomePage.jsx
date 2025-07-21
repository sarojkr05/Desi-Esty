import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Star } from "lucide-react";
import Layout from "../layout/Layout";
import { Typewriter } from "react-simple-typewriter";
import ClayPotImg from "../assets/images/Clay Pot.jpg";
import WoolImg from "../assets/images/Wool Imag.jpg";
import JewelryImg from "../assets/images/Jewlery.jpg";
import WoodenSpoonImg from "../assets/images/Wooden Spoons.jpg";
import { useDispatch } from "react-redux";
import { openRegisterModal } from "../redux/modalSlice";

const productData = [
  {
    id: 1,
    title: "Clay Pots Set",
    description: "Handmade clay pots from Rajasthan.",
    image: ClayPotImg,
  },
  {
    id: 2,
    title: "Wool Handcraft",
    description: "Colorful wool handmade products.",
    image: WoolImg,
  },
  {
    id: 3,
    title: "Wooden Spoon Set",
    description: "Elegant handcrafted wooden utensils.",
    image: WoodenSpoonImg,
  },
  {
    id: 4,
    title: "Handmade Jewelry",
    description: "Beaded bracelets crafted with care.",
    image: JewelryImg,
  },
];

const HomePage = () => {
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(openRegisterModal());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-amber-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full px-6 py-20 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-amber-600">
          <Typewriter
            words={[
              "Discover Handmade Treasures",
              "Support Local Artisans",
              "Shop Unique Cultural Products",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600">
          Support local artisans by shopping unique, handmade crafts and
          cultural products.
        </p>
        <Link to="/products">
          <button className="px-8 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-12">
        <div className="flex flex-col items-center text-center">
          <Star className="w-10 h-10 text-amber-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Verified Artisans</h3>
          <p className="text-gray-600">
            Only approved and trusted sellers from local communities.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Search className="w-10 h-10 text-amber-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Smart Filters</h3>
          <p className="text-gray-600">
            Easily find products by category, region, or artisan type.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <ShoppingCart className="w-10 h-10 text-amber-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
          <p className="text-gray-600">
            Pay securely using Razorpay and get smooth order tracking.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productData.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-md mb-4 object-cover w-full h-[200px] bg-gray-100"
              />
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <button className="mt-3 px-4 py-2 bg-amber-500 text-white text-sm rounded-full hover:bg-amber-600 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-100 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Are you an Artisan?
        </h2>
        <p className="text-gray-700 mb-6">
          Join Desi Etsy to showcase your handmade creations and reach customers
          across the country.
        </p>
        <button
          onClick={handleRegister}
          className="px-8 py-3 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
        >
          Register as Seller
        </button>
      </section>
    </div>
  );
};

export default HomePage;
