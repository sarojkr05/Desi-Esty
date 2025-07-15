import { Link } from "react-router-dom";
import { PlusCircle, ShoppingBag, CheckCircle, XCircle } from "lucide-react";
import Layout from "../layout/Layout";

const ArtisanDashboard = () => {
  // This data will later come from backend (via Redux or API call)
  const artisan = {
    name: "Saroj Kumar",
    totalProducts: 8,
    approvedProducts: 6,
    pendingProducts: 2,
    isApproved: true,
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-white to-amber-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2 text-amber-600">Welcome, {artisan.name}</h1>
          <p className="text-gray-600">
            {artisan.isApproved
              ? "You're approved to publish handmade products."
              : "Your artisan profile is pending admin approval."}
          </p>
          {!artisan.isApproved && (
            <div className="mt-3 inline-flex items-center gap-2 text-sm text-red-500 font-medium">
              <XCircle className="w-4 h-4" />
              Approval pending — please wait for admin approval
            </div>
          )}
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <ShoppingBag className="text-amber-500 w-8 h-8 mb-2" />
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-gray-600 text-lg">{artisan.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <CheckCircle className="text-green-500 w-8 h-8 mb-2" />
            <h2 className="text-xl font-semibold">Approved</h2>
            <p className="text-gray-600 text-lg">{artisan.approvedProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <XCircle className="text-red-500 w-8 h-8 mb-2" />
            <h2 className="text-xl font-semibold">Pending</h2>
            <p className="text-gray-600 text-lg">{artisan.pendingProducts}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center">
          <Link to="/add-product">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-full shadow hover:bg-amber-600 transition">
              <PlusCircle className="w-5 h-5" />
              Add New Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
