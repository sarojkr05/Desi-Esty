import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProducts, deleteProduct } from "../../redux/productSlice";
import ViewProductsPresentation from "./ViewProductsPresentation";

const ViewProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const user = useSelector((state) => state.auth.userData);
  const { myProducts, loading, error } = useSelector(
    (state) => state.products || []
  );

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts =
    statusFilter === null
      ? myProducts
      : myProducts.filter((p) => p.isApproved === statusFilter);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ViewProductsPresentation 
      navigate={navigate}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      user={user}
      handleDelete={handleDelete}
      filteredProducts={filteredProducts}
    />
  )
};

export default ViewProducts;
