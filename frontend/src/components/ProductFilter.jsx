import { motion } from "framer-motion";
import { categories } from "../utils/constant";
import {  useState } from "react";
import { X } from "lucide-react";
const ProductFilter = ({ onApplyFilters, onClose,setIsFilterApplied }) => {
  const [price, setPrice] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState("All");

 const handleCategoryChange = (categoryName) => {
  setSelectedCategories((prev) =>
    prev.includes(categoryName)
      ? prev.filter((cat) => cat !== categoryName)
      : [...prev, categoryName]
  );
};


  const handleApplyFilters = () => {
    onApplyFilters({ categories: selectedCategories, price, rating });
     setIsFilterApplied(true);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="bg-amber-200/40 shadow-xl h-full w-[80%] md:w-[20%] fixed right-0 top-0 z-50 p-4 overflow-y-auto"
    >
      {" "}
      <div className="flex justify-between items-center text-xl font-semibold mb-4 text-amber-700">
        <h2 className="">Filters</h2>
        <X className="" onClick={onClose} />
      </div>
      <div className="border-b text-amber-600 p-2">
        <h4 className="font-medium mb-2">Category</h4>
        {categories.map((cat) => (
          <li key={cat.name} className="list-none mb-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-amber-600"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => handleCategoryChange(cat.name)}
              />
              <span>{cat.name}</span>
            </label>
          </li>
        ))}
      </div>
      <div className="border-b text-amber-600 p-2">
        <h4 className="font-medium mb-2">Price Range</h4>
        <input
          type="range"
          min={500}
          max={10000}
          value={price}
          step={100}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full accent-amber-600"
        />
        <div className="text-sm text-gray-700 mt-1">
          <span className="font-medium text-amber-600">₹0 – ₹{price}</span>
        </div>
      </div>
      <div className="border-b text-amber-600 p-2">
        <h4 className="font-medium mb-2">Ratings</h4>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border rounded px-2 py-1 outline-none"
        >
          <option>All</option>
          <option>4 ★ & above</option>
          <option>3 ★ & above</option>
        </select>
      </div>
      <button
        onClick={handleApplyFilters}
        className="w-full mt-4 bg-amber-600 text-white py-2 rounded font-semibold hover:bg-amber-700 transition"
      >
        Show Results
      </button>
    </motion.div>
  );
};

export default ProductFilter;
