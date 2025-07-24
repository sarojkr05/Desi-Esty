import { useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveProduct, getAllUnApprovedProducts } from "../../redux/adminSlice";

export default function UnapprovedProducts() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.admin.admin.products);

    useEffect(() => {
        dispatch(getAllUnApprovedProducts())
    }, [dispatch])

    const handleApprove = async (id) => {
        await dispatch(approveProduct(id))
        dispatch(getAllUnApprovedProducts()) // refresh the page after approval
    }
    
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Unapproved Products</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Price</th>
            <th>Artisan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>{p.artisan?.name}</td>
              <td>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded"
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
