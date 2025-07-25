import React from 'react'
import { Search, Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

import ProductFilter from "../components/ProductFilter";

const ProductsPresentation = ({ showFilter, setIsFilterApplied, searchText, setSearchText, toggleFilter, productsToRender, setShowfilter, handleApplyFilters }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Main content */}
      <div
        className={`transition-all duration-300 px-4 py-10 ${
          showFilter ? "lg:w-[80%]" : "w-full"
        }`}
      >
        <div className="flex justify-center items-center gap-4 flex-wrap mb-6">
          <div className="flex w-full max-w-2xl shadow-sm rounded-lg relative">
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsFilterApplied(true);
              }}
              value={searchText}
              type="text"
              name="search"
              placeholder="Try searching earrings , home decor etc..."
              className="w-full p-4 border text-amber-700 font-medium border-amber-300 outline-none rounded-l-lg bg-white placeholder:text-sm"
            />
            {searchText && (
              <X
                className="text-amber-500 absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
                size={20}
                onClick={() => {
                  setSearchText("");
                  setIsFilterApplied(false);
                }}
              />
            )}
            <button className="p-2 bg-amber-100 rounded-r-lg border border-l-0 border-amber-300 hover:bg-amber-300">
              <Search className="text-amber-500" size={22} />
            </button>
          </div>

          <button
            onClick={toggleFilter}
            className="flex items-center gap-1 text-amber-600 font-semibold hover:text-amber-700 transition"
          >
            <Filter size={20} /> Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {productsToRender &&
            productsToRender.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

      {/* Sidebar filter for desktop only */}
      {showFilter && (
        <div className="w-full lg:w-[20%] bg-white shadow-xl border-t lg:border-t-0 border-amber-200 z-10">
          <ProductFilter
            onApplyFilters={handleApplyFilters}
            setIsFilterApplied={setIsFilterApplied}
            onClose={() => {
              setShowfilter(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductsPresentation
