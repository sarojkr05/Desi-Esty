import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchApprovedProducts } from "../redux/productSlice";

const ProductDetailCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const navigate =useNavigate();
  const { approvedProducts, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch approved products when component mounts
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

  const product = approvedProducts?.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="text-center text-amber-600 font-semibold mt-10">
        Product not found.
      </div>
    );
  }

  const { _id, title, description, price, image, category } = product;
  const handleAddToCart =()=>{
    navigate('/my-cart')
  }
  return (
    <div className="w-[95%] md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto my-12 bg-white shadow-xl rounded-2xl p-8 space-y-6">
      
      <img
        src={image}
        alt={title}
        className="w-full h-[300px] object-contain rounded-lg shadow"
      />

      <h1 className="text-2xl font-bold text-amber-500 my-1">{title}</h1>
      <p className="text-sm font-semibold text-amber-500 my-2">{category}</p>
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

      
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button 
         onClick={handleAddToCart}
         className="flex-1 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition">
          Add to Cart
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
};

export default ProductDetailCard;
