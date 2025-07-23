import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchApprovedProducts } from "../redux/productSlice";
import { addProductToCart, getCartDetails } from "../redux/CartSlice";
import ProductDetailCartPresentation from "./productDetailCartPresentation";

const ProductDetailCard = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const { approvedProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!approvedProducts || approvedProducts.length === 0) {
      dispatch(fetchApprovedProducts());
    }
  }, [dispatch, approvedProducts]);

  if (loading) {
    return (
      <div className="text-center text-amber-600 font-semibold mt-10">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error fetching product details.
      </div>
    );
  }

  if (!approvedProducts || !Array.isArray(approvedProducts)) {
    return <div>Loading product details...</div>;
  }

  const product = approvedProducts.find(
    (p) => String(p._id) === String(productId)
  );

  if (!product) {
    return (
      <div className="text-center text-amber-600 font-semibold mt-10">
        Product not found.
      </div>
    );
  }

  const { title, description, price, image, category } = product;

  async function handleCart() {
    const response = await dispatch(
      addProductToCart({ _id: productId, quantity })
    );

    console.log("response from back", response.payload);

    if (response?.payload?._id) {
      setIsInCart(true);
      dispatch(getCartDetails());
    }
  }

  return (
    <ProductDetailCartPresentation 
      quantity={quantity}
      isInCart={isInCart}
      setQuantity={setQuantity}
      title={title}
      description={description}
      price={price}
      image={image}
      category={category}
      handleCart={handleCart}
    />
  )
};

export default ProductDetailCard;
