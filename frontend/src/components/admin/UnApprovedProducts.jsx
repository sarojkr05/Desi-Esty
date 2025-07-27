import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveProduct,
  getAllUnApprovedProducts,
} from "../../redux/adminSlice";

export default function UnapprovedProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.admin.products);

  useEffect(() => {
    dispatch(getAllUnApprovedProducts());
  }, [dispatch]);

  const handleApprove = async (id) => {
    await dispatch(approveProduct(id));
    dispatch(getAllUnApprovedProducts()); // refresh the page after approval
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Artisan</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.title}</td>
              <td className="p-2">₹{p.price}</td>
              <td className="p-2">{p.artisan?.name}</td>
              <td className="p-2">
                <button
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded"
                  onClick={() => handleApprove(p._id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
