import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveArtisan, getAllUnApprovedArtisans } from "../../redux/adminSlice";

export default function UnapprovedArtisans() {
  const dispatch = useDispatch();
  const artisans = useSelector((state) => state.admin.admin.artisans);

  useEffect(() => {
    dispatch(getAllUnApprovedArtisans());
  }, [dispatch]);

  const handleApprove = async (id) => {
    await dispatch(approveArtisan(id));
    dispatch(getAllUnApprovedArtisans()); // Refresh the list
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-amber-500">Unapproved Artisans</h2>
      <table className="w-full border border-gray-300 text-left table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {artisans?.map((artisan) => (
            <tr key={artisan._id} className="border-t border-gray-300">
              <td className="px-4 py-2 border">{artisan.name}</td>
              <td className="px-4 py-2 border">{artisan.email}</td>
              <td className="px-4 py-2 border">
                <button
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded"
                  onClick={() => handleApprove(artisan._id)}
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
