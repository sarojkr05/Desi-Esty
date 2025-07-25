import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveArtisan, getAllUnApprovedArtisans } from "../../redux/adminSlice";

export default function UnapprovedArtisans() {
    const dispatch = useDispatch();
    const artisans = useSelector((state) => state.admin.admin.artisans);

    console.log("artisan from state", artisans)

    useEffect(() => {
        dispatch(getAllUnApprovedArtisans())
    }, [dispatch])

    const handleApprove = async (id) => {
        await dispatch(approveArtisan(id))
        dispatch(getAllUnApprovedArtisans()) // Refreshes the page
    }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Unapproved Artisans</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {artisans?.map((artisan) => (
            <tr key={artisan._id} className="border-t">
              <td>{artisan.name}</td>
              <td>{artisan.email}</td>
              <td>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
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
