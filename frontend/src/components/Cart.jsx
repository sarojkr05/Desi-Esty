import { useState } from "react";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
    
        <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT8raRR7vO7hH63qCKv0vPEQHIoNf4_2MiUaGRlNfn5I1ieeWB2BTkikjSJTRkpxkd4HWufqSrRb2pWpPreUAxFehM60vEoBD3tTMcrcUG9"
            alt="Decorative Pot"
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h1 className="text-xl font-bold text-amber-700">Decorative Pot</h1>
          <p className="text-gray-600 text-sm">Category: Home Decor</p>
          <p className="text-gray-500 text-sm">This is best for your balcony</p>

          
          <div className="flex justify-center md:justify-start items-center gap-4 mt-3">
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
        </div>

       
        <div className="text-right">
          <h2 className="text-2xl font-bold text-amber-700">₹ 599</h2>
          <p className="text-sm text-gray-500">Total: ₹ {599 * quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
