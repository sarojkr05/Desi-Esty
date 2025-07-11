import { motion } from "framer-motion";
import { categories } from "../utils/constants";
import { Check } from "lucide-react";
import { useState } from "react";
const ProductFilter = () => {
  const [price, setPrice] = useState(1000);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="bg-amber-300/20 shadow-xl h-full w-[80%] md:w-[20%] fixed right-0 top-0 z-50 p-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-amber-700">Filters</h2>
      <div className="border-b-2 text-amber-600 p-2">
        Category
        {categories.map((cat) => (
          <li key={cat} className="list-none">
            <label className="flex items-center gap-2 ">
              <input type="checkbox" className="accent-amber-600" />
              <span>{cat}</span>
            </label>
          </li>
        ))}
        <button className="w-full my-2 bg-amber-600 text-white py-2 rounded font-semibold hover:bg-amber-700 transition">
          Show Results
        </button>
      </div>

      <div className="border-b-2 text-amber-500 p-2">
        Price Range
        <input
          type="range"
          min={500}
          max={10000}
          value={price}
          step={100}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full accent-amber-600"
        />
        {/* Display Selected Price */}
        <div className="text-sm text-gray-700">
          <span className="font-medium text-amber-600">₹0 – ₹{price}</span>
        </div>
        <button className="w-full my-2 bg-amber-600 text-white py-2 rounded font-semibold hover:bg-amber-700 transition">
          Show Results
        </button>
      </div>

     <div className="border-b-2 text-amber-500 p-2">
        <h4 className="font-medium mb-2">Ratings</h4>
        <select className="w-full border rounded px-2 py-1 outline-none">
          <option>All</option>
          <option>4 ★ & above</option>
          <option>3 ★ & above</option>
        </select>
      </div>
    </motion.div>
  );
};

export default ProductFilter;
