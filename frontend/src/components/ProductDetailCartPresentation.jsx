import React from 'react'
import { Star } from "lucide-react";
import { Link } from 'react-router-dom';

const productDetailCartPresentation = ({ image, title, description, price, category, quantity, setQuantity, handleCart, isInCart }) => {


  
  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
      <img
        src={image}
        alt={title}
        className="w-full h-[300px] object-cover rounded-lg shadow"
      />

      <h1 className="text-2xl font-bold text-amber-500">{title}</h1>
      <p className="text-sm font-semibold text-amber-500">{category}</p>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>

      <h3 className="text-xl font-semibold text-gray-800">
        Price: <span className="text-amber-500 font-bold">₹ {price}</span>
      </h3>

      <p className="flex items-center gap-1 text-sm text-gray-600">
        Ratings:
        <Star className="text-amber-500" size={16} />
        <span className="text-gray-700 font-medium">4.7/5</span>
      </p>

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

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleCart}
          className="flex-1 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition"
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
        <button className="flex-1 py-3 bg-white border border-amber-600 text-amber-600 rounded-full font-semibold hover:bg-amber-100 transition">
          Buy Now
        </button>
      </div>

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
}

export default productDetailCartPresentation
