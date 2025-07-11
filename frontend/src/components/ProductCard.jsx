import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {

  const handleBuy =()=>{
    console.log("Buy item" ,data.id, data.name)
  }
  return (
    <div className="h-[290px] w-64 p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl">
      <img
        src={data.img}
        alt="Artifict"
        className="h-[50%] w-full p-2 rounded-lg"
      />
      <div className="px-2 py-1">
        <h2 className="text-amber-500 font-medium text-xl">{data.name}</h2>
        <p className="font-light text-gray-500 text-sm ">{data.desc}</p>
        <p className="font-bold text-lg mr-3"> ₹ {data.price}</p>
      </div>
       <div className="flex justify-center items-center">
        <Link to={`/product/${data.id}`}>
        <button 
         onClick={handleBuy}
        className="py-1 px-4 flex-1 bg-amber-700/100 text-white font-semibold  rounded-lg hover:cursor-pointer ">
        Buy Now
      </button>
      </Link>
       </div>
      
     
    </div>
  );
};
export default ProductCard;
