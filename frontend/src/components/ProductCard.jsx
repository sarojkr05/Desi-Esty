import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {


  return (
    <div className="h-[310px] w-64 p-3 bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-amber-100">
      <img
        src={data.img}
        alt={data.name}
        className="h-[50%] w-full object-fill rounded-lg mb-3"
      />
      <div className="px-2">
        <h2 className="text-lg font-bold text-amber-600 truncate">{data.name}</h2>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{data.desc}</p>
        <p className="font-semibold text-amber-700 text-base mb-3">₹ {data.price}</p>
        <Link
          to={`/product/${data.id}`}
          className="block w-full text-center py-2 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
