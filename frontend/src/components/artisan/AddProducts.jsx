import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, fetchMyProducts, updateProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import AddProductPresentation from "./AddProductPresentation";

const AddProduct = ({ mode = "add", existingProduct = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    quantity: "",
    inStock: false,
  });

  useEffect(() => {
    if (mode === "edit" && existingProduct) {
      setFormData(existingProduct);
    }
  }, [mode, existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      dispatch(updateProduct({ id: existingProduct._id, updatedData: formData }));
    } else {
      dispatch(createProduct(formData));
      dispatch(fetchMyProducts())
    }
    navigate("/view-products");
  };

  return (
    <AddProductPresentation 
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      mode={mode}
    />
  )
};

export default AddProduct;
