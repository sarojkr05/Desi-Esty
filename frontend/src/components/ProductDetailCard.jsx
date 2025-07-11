import React from "react";
import { Star } from "lucide-react";
import { Link   ,useParams} from "react-router-dom";
import { products } from "../utils/constants";
import { useState } from "react";
const ProductDetailCard = () => {
  const {id} =useParams();
  const [quantity ,setQuantity] =useState(1)
  const product =products.find((product)=> product.id === parseInt(id));

  if(!product){
    return <div>Product not listed</div>
  }
 
  return (
    <div className="w-[90%] md:w-2/3 lg:w-1/2 mx-auto my-10 bg-white shadow-[0_4px_20px_rgba(217,119,6,0.1)] rounded-xl p-6 space-y-4">
      {/* Product Image */}
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-64 object-contain rounded-md "
      />

      
      <h1 className="text-2xl font-bold text-amber-600">{product.name}</h1>

      <p className="text-gray-600 text-sm leading-relaxed">
        {product.desc}
      </p>

    
      <h3 className="text-lg font-semibold text-gray-800">
        Price: <span className="text-amber-600 font-bold">₹ {product.price}</span>
      </h3>

    
      <p className="flex items-center gap-1 text-sm text-gray-600">
        Ratings:
        <Star className="text-amber-500" size={16} />
        <span className="text-gray-700 font-medium">4.7/5</span>
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 text-gray-700">
        <span className="font-semibold">Quantity:</span>
        <button 
        onClick={()=>{setQuantity(quantity-1)}}
        className="px-3 py-1 border border-amber-500 rounded-md text-lg font-bold text-amber-600 hover:bg-amber-100 transition cursor-pointer">
          -
        </button>
        <p className="w-8 text-center font-medium">{quantity}</p>
        <button 
        onClick={()=>{setQuantity(quantity+1)}}
        className="px-3 py-1 border border-amber-500 rounded-md text-lg font-bold text-amber-600 hover:bg-amber-100 transition cursor-pointer">
          +
        </button>
      </div>

      {/* Call-to-action Buttons */}
      <div className="flex gap-4 mt-4">
        <button className="flex-1 py-2 bg-amber-600 text-white rounded-md font-semibold hover:bg-amber-700 transition">
          Add to Cart
        </button>
        <button className="flex-1 py-2 bg-white border border-amber-600 text-amber-600 rounded-md font-semibold hover:bg-amber-100 transition">
          Buy Now
        </button>
      </div>

      {/* View Similar Link */}
      <div className="text-right">
        <Link
          to="#"
          className="text-sm text-amber-600 font-medium hover:underline"
        >
          View Similar Products →
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailCard;
