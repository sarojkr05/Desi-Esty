import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import toast from "react-hot-toast";
import { fetchUserProfile, updateUserProfile } from "../redux/userSlice";
import { getCartDetails } from "../redux/CartSlice";
import { placeOrder } from "../redux/orderSlice";
import {CircleChevronLeft} from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartData.items || []);
  const profile = useSelector((state) => state.user.userProfile);

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getCartDetails());
  }, [dispatch]);

  useEffect(() => {
    if (profile && !profile.isProfileComplete) {
      setName(profile.name || "");
      setMobileNumber(profile.mobileNumber || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setStateName(profile.state || "");
      setCountry(profile.country || "India"); // default country
    }
  }, [profile]);

  const handleProfileUpdate = async () => {
    const updatedData = {
      name,
      mobileNumber,
      address,
      city,
      state: stateName,
      country,
    };

    try {
      const resultAction = await dispatch(updateUserProfile(updatedData));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(resultAction.payload || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Unexpected error during profile update.");
    }
  };

   const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const handleOrderNow = async () => {
    if (!profile?.isProfileComplete) {
      toast.error("Complete your profile to place an order.");
      navigate("/user/profile");
      return;
    }
    
    const resultAction = await dispatch(
    placeOrder({
    userId: profile.id,
    items: cartItems,
    totalAmount:totalAmount,
    address: profile.address || address, 
  }))
    
    if (placeOrder.fulfilled.match(resultAction)) {
      const orderData = resultAction.payload;
      navigate("/order-confirmation", { state: { order: orderData } });
    }
  };
 

  if (!profile || !cartItems) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading checkout data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 p-6 bg-white shadow-xl rounded-2xl border border-amber-100">
       <div className="fixed top-20 left-6 flex items-center text-amber-500 font-bold gap-2 z-50">
          <Link to="/products">
            <CircleChevronLeft size={24} />
          </Link>
          <span className="hidden sm:inline">Back</span>
        </div>
      <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center">
        Checkout Summary
      </h2>

      {/* Products Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-amber-600 mb-4">
          Your Products
        </h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => {
            const product = item.product;
            return (
              <div
                key={item._id || index}
                className="flex items-center justify-between bg-amber-50 p-4 mb-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div>
                    <p className="font-medium text-amber-700">
                      {product?.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-amber-600 font-semibold text-lg">
                  ₹{product?.price * item.quantity}
                </div>
              </div>
            );
          })
        )}
        <div className="p-2 m-2 text-amber-500 font-semibold">
          <Link  to='/products' >Shop More</Link>
        </div>
        <div className="text-right mt-4 text-xl font-bold text-amber-600">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-6 p-6 border border-amber-200 rounded-2xl bg-amber-50 shadow-sm">
          <h3 className="text-xl font-semibold text-amber-600 mb-4">
            📦 Shipping Details
          </h3>

          {profile?.name ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="bg-white rounded-lg p-3 shadow border border-amber-100">
                <p className="text-amber-600 font-medium">👤 Name</p>
                <p>{profile.name}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow border border-amber-100">
                <p className="text-amber-600 font-medium">📧 Email</p>
                <p>{profile.email}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow border border-amber-100">
                <p className="text-amber-600 font-medium">📱 Mobile</p>
                <p>{profile.mobileNumber}</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow border border-amber-100 md:col-span-2">
                <p className="text-amber-600 font-medium">🏠 Address</p>
                <p>
                  {profile.address}, {profile.city}, {profile.state},{" "}
                  {profile.country}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-6 border border-red-200 rounded-2xl bg-red-50 shadow-sm">
              <h3 className="text-xl font-semibold text-red-800 mb-4">
                🚧 Complete Your Shipping Info
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleProfileUpdate}
              >
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Email"
                  value={user?.email || ""}
                  disabled
                />
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="State"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </form>
            </div>
          )}
        </div>
      </section>

      <button
        onClick={handleOrderNow}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg py-3 rounded-xl transition"
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
