import { ArrowLeft, Trash, Edit, Filter } from "lucide-react";
import { Link } from 'react-router-dom';

const ViewProductsPresentation = ({ navigate, showFilter, setShowFilter, setStatusFilter, filteredProducts, user, handleDelete }) => {
  return (
    <>
      <div>
        {filteredProducts.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}
        <div className="flex justify-between items-center px-4 py-5 relative">
          <div className="text-amber-500 font-semibold">
            <Link to="/dashboard/artisan" className="flex gap-2 items-center">
              <ArrowLeft size={22} />
              Back To Dashboard
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-amber-500 font-semibold"
            >
              <Filter size={18} />
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2  shadow-lg w-32 rounded-sm overflow-hidden text-center z-10">
                <ul className="text-amber-700 font-semibold text-sm">
                  <li
                    onClick={() => setStatusFilter(true)}
                    className="border-b p-2 hover:bg-amber-200 cursor-pointer"
                  >
                    Approved
                  </li>
                  <li
                    onClick={() => setStatusFilter(false)}
                    className="p-2 hover:bg-amber-200 cursor-pointer"
                  >
                    Pending
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Hey {user.name} 👋,Have a look at Your Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="h-[250px] rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[50%] w-full object-fit rounded-xl"
                />
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {product.title}
                </h3>

                <p
                  className={`text-sm font-semibold mb-1 ${
                    product?.isApproved === true
                      ? "text-green-600"
                      : product?.isApproved === false
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {product?.isApproved === true
                    ? "Approved"
                    : product?.isApproved === false
                    ? "Pending"
                    : "Rejected"}
                </p>

                <p className="text-sm text-gray-600">
                  Uploaded on:{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-end gap-4 text-amber-500 font-semibold mt-2">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    className="flex items-center hover:text-amber-600 p-2"
                  >
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center hover:text-red-500 p-2"
                  >
                    <Trash size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProductsPresentation
