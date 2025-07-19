import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../redux/productSlice";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
    }
    navigate("/view-products");
  };

  return (
    <>
      <div className="text-amber-500 my-5 p-2">
        <Link to="/dashboard/artisan" className="flex gap-4">
          <ArrowLeft size={24} />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            disabled={mode === "edit"}
            className={`w-full border p-2 rounded ${
              mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            disabled={mode === "edit"}
            className={`w-full border p-2 rounded ${
              mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            disabled={mode === "edit"}
            className="w-full border p-2 rounded "
         
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="w-full border p-2 rounded"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={formData.image}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="accent-amber-400"
            />
            In Stock
          </label>

          <button
            type="submit"
            className="bg-amber-400 text-white font-semibold px-4 py-2 rounded hover:bg-amber-600"
          >
            {mode === "edit" ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
