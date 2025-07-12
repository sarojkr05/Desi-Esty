import React from "react";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "../utils/constants";
import { useState } from "react";

const ProductDetailCard = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-amber-600 font-semibold mt-10">Product not listed</div>;
  }

  return (
    <div className="w-[95%] md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-12 bg-white shadow-xl rounded-2xl p-8 space-y-6">
      {/* Product Image */}
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-[300px] object-contain rounded-lg shadow"
      />

      <h1 className="text-3xl font-bold text-amber-500">{product.name}</h1>

      <p className="text-gray-600 text-base leading-relaxed">{product.desc}</p>

      <h3 className="text-xl font-semibold text-gray-800">
        Price: <span className="text-amber-500 font-bold">₹ {product.price}</span>
      </h3>

      <p className="flex items-center gap-1 text-sm text-gray-600">
        Ratings:
        <Star className="text-amber-500" size={16} />
        <span className="text-gray-700 font-medium">4.7/5</span>
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 text-gray-700">
        <span className="font-semibold">Quantity:</span>
        <button
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          className="px-3 py-1 border border-amber-500 rounded-md text-lg font-bold text-amber-600 hover:bg-amber-100 transition"
        >
          -
        </button>
        <p className="w-8 text-center font-medium">{quantity}</p>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 border border-amber-500 rounded-md text-lg font-bold text-amber-600 hover:bg-amber-100 transition"
        >
          +
        </button>
      </div>

      {/* Call-to-action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button className="flex-1 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition">
          Add to Cart
        </button>
        <button className="flex-1 py-3 bg-white border border-amber-600 text-amber-600 rounded-full font-semibold hover:bg-amber-100 transition">
          Buy Now
        </button>
      </div>

      {/* View Similar Link */}
      <div className="text-right">
        <Link
          to="/products"
          className="text-sm text-amber-600 font-medium hover:underline"
        >
          View Similar Products →
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailCard;