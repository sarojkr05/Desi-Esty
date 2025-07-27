import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/userSlice";
import { fetchMyProducts } from "../redux/productSlice";
import AdminDashboardPresentation from "./AdminDashboardPresentation";
const ArtisanDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userData);
  const { myProducts = [] } = useSelector((state) => state.products);
  console.log("curr user:", currentUser);

  const { name, isApproved } = currentUser || {};
  const isUserApproved = isApproved === true || isApproved === "true";
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchMyProducts()).then((res) => {
    });
  }, [dispatch]);
  
  const navigate = useNavigate();

  const totalCount = myProducts.length;

  const approvedCount = myProducts.filter((p) => p.isApproved).length;

  const pendingCount = myProducts.filter((p) => !p.isApproved).length;

  const handleAddProduct = () => {
    navigate("/add-product");
  };
  const handleViewProduct = () => {
    navigate("/view-products");
  };

  return (
    <AdminDashboardPresentation 
      currentUser={currentUser}
      myProducts={myProducts}
      name={name}
      isUserApproved={isUserApproved}
      totalCount={totalCount}
      approvedCount={approvedCount}
      pendingCount={pendingCount}
      handleAddProduct={handleAddProduct}
      handleViewProduct={handleViewProduct}
    />
  )
};

export default ArtisanDashboard;
