import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Layout from "../layout/Layout";
import { products as allProducts, categories } from "../utils/constant";
import ProductFilter from "../components/ProductFilter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Products = () => {
  const [showFilter, setShowfilter] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    price: 10000,
    rating: "All",
  });
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

  const toggleFilter = () => setShowfilter(!showFilter);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowfilter(false);
  };

  const handleShowCategories = (index) => {
    setActiveCategoryIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filterProducts = () => {
    return allProducts.filter((product) => {
      const inCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const inPriceRange = product.price <= filters.price;
      const inRating =
        filters.rating === "All" ||
        (filters.rating === "4 ★ & above" && product.rating >= 4) ||
        (filters.rating === "3 ★ & above" && product.rating >= 3);
      return inCategory && inPriceRange && inRating;
    });
  };

  const filteredProducts = filterProducts();

  return (
    <Layout>
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-white">
        <div
          className={`transition-all duration-300 px-4 py-10 ${
            showFilter ? "w-[80%]" : "w-full"
          }`}
        >
          <div className=" flex justify-center items-center gap-4 flex-wrap mb-6">
            <div className="flex w-2xl shadow-sm rounded-lg">
              <input
                type="text"
                name="search"
                placeholder="Try searching earrings , home decor etc..."
                className="w-full p-4 sm:w-[96%] border text-amber-700 font-medium border-amber-300 outline-none rounded-l-lg bg-white placeholder:text-sm"
              />
              <button className="p-2 bg-amber-100 rounded-r-lg border border-l-0 border-amber-300 hover:cursor-pointer hover:bg-amber-300">
                <Search className="text-amber-500 " size={22} />
              </button>
            </div>

            <button
              onClick={toggleFilter}
              className="flex items-center gap-1 text-amber-600 font-semibold hover:text-amber-700 transition"
            >
              <Filter size={20} /> Filters
            </button>
          </div>

          <div className="bg-amber-100/60 mt-6 p-6 rounded-xl shadow-md">
            <h2 className="text-center text-2xl font-bold text-amber-700 mb-6">
              Explore By Categories
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((cat, idx) => (
                <div key={idx} className="text-center">
                  <button
                    onClick={() => handleShowCategories(idx)}
                    className="h-10 px-5 mb-2 rounded-xl font-semibold transition bg-white text-amber-700 hover:bg-amber-200 hover:text-amber-800"
                  >
                    {cat.name}
                  </button>

                  {activeCategoryIndex === idx && (
                    <AnimatePresence>
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 px-2 py-1 text-sm font-semibold list-none text-amber-500 list-inside flex flex-col "
                      >
                        {cat.subcategories.map((sub, i) => (
                          <li className="bg-white shadow-lg text-amber-700 p-2 my-1 rounded-lg font-semibold hover:bg-amber-200 hover:text-amber-800 transition duration-300 cursor-pointer text-sm" key={i}>{sub}</li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))
            ) : (
              <p className="text-center text-amber-600 font-semibold">
                No products match the selected filters.
              </p>
            )}
          </div>
        </div>

        {showFilter && (
          <div className="w-[20%] bg-white shadow-xl">
            <ProductFilter
              onApplyFilters={handleApplyFilters}
              onClose={() => {
                setShowfilter(false);
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
