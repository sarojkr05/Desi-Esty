import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AddProducts from "./AddProducts";
import { fetchMyProducts } from "../../redux/productSlice";

const EditProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.myProducts);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const productToEdit = products?.find((p) => p._id === id);

  

  return (
    <div>
      <AddProducts mode="edit" existingProduct={productToEdit} />
    </div>
  );
};

export default EditProducts;
