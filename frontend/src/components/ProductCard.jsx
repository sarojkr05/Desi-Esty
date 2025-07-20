import { Link,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice"; 


const ProductCard = ({ product }) => {
const { _id, title, description, price, image, category } = product;
const dispatch = useDispatch(); 
const navigate = useNavigate(); 
const handleAddToCart = () => {
  dispatch(addToCart(product)); 
  navigate("/my-cart");         
};
  return (
    <div className="h-[350px] w-64 p-3 bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-amber-100">
      <img
        src={image}
        alt={title}
        className="h-[50%] w-full object-fill rounded-lg mb-3"
      />
      <div className="px-2">
        <h2 className="text-lg font-bold text-amber-600 truncate">{title}</h2>
        <p className="text-sm font-semibold text-gray-400 ">{category}</p>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
        <p className="font-semibold text-amber-700 text-base mb-3">₹ {price}</p>
        <Link
          to={`/product/${_id}`}
          className="block w-full text-center py-2 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition"
        >
          Buy Now
        </Link>
        
      </div>
    </div>
  );
};

export default ProductCard;
