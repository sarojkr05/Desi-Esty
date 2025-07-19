import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState ,useEffect } from "react";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    mobileNumber: currentUser?.mobileNumber || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    country: currentUser?.country || "",
  });
  console.log("curr user",currentUser)
   useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        mobileNumber: currentUser.mobileNumber || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        country: currentUser.country || "",
      }));
    }
  }, [currentUser]);

 if (!currentUser) return <p>Loading user profile...</p>;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="   text-amber-500 mt-0  p-4 font-semibold">
          <Link to="/products" className="flex gap-2">
            <ArrowLeft size={22} />
            Continue Shopping
          </Link>
        </div>
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
              alt="User Avatar"
              className="w-24 h-24 rounded-full mb-2"
            />
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="border border-amber-500 px-2 py-1 rounded mt-1 text-center w-1/2 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Contact No.</label>
              <input
                type="text"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Email Id</label>
              <input
                type="text"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
              placeholder="Enter City"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
              placeholder="Enter State"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={handleChange}
              className="border border-amber-500 p-2 rounded w-full focus:outline-none focus:border-amber-600"
              readOnly
            />
          </div>
          <div>
            <button className="m-4 right-0 bg-amber-600 text-white font-semibold px-4 py-2 rounded hover:bg-amber-500">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserProfile;
