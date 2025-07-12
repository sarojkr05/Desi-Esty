import { motion } from "framer-motion";
import { categories } from "../utils/constant";
import { useEffect, useState } from "react";

const ProductFilter = ({ onApplyFilters }) => {
  const [price, setPrice] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({ categories: selectedCategories, price, rating });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4 }}
      className="bg-amber-100/40 shadow-xl h-full w-[80%] md:w-[20%] fixed right-0 top-0 z-50 p-4 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-amber-700">Filters</h2>

      <div className="border-b text-amber-600 p-2">
        <h4 className="font-medium mb-2">Category</h4>
        {categories.map((cat) => (
          <li key={cat} className="list-none mb-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-amber-600"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <span>{cat}</span>
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
