import { Search, Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

import ProductFilter from "../components/ProductFilter";
import { useState, useEffect } from "react";
import { fetchApprovedProducts } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";

const Products = () => {
  const [showFilter, setShowfilter] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [searchText, setSearchText] = useState("");


  const [filters, setFilters] = useState({
    categories: [],
    price: 10000,
    rating: "All",
  });

  const { approvedProducts, loading, error } = useSelector(
    (state) => state.products
  );
  console.log(approvedProducts, "approved Products");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApprovedProducts());
  }, [dispatch]);
  

  const toggleFilter = () => setShowfilter(!showFilter);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowfilter(false);
  };

  const filterProducts = () => {
    return approvedProducts.filter((product) => {
      const inCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const inPriceRange = product.price <= filters.price;
      const inRating =
        filters.rating === "All" ||
        (filters.rating === "4 ★ & above" && product.rating >= 4) ||
        (filters.rating === "3 ★ & above" && product.rating >= 3);
      const matchesSearch =
        searchText.trim() === "" ||
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase());

      return inCategory && inPriceRange && inRating && matchesSearch;
    });
  };

  const productsToRender = isFilterApplied
    ? filterProducts()
    : approvedProducts;

  if (loading) return <p className="text-center text-red-500">Loading ...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <div
        className={`transition-all duration-300 px-4 py-10 ${
          showFilter ? "w-[80%]" : "w-full"
        }`}
      >
        <div className=" flex justify-center items-center gap-4 flex-wrap mb-6">
          <div className="flex w-2xl shadow-sm rounded-lg relative">
            <input
              onChange={(e) => {setSearchText(e.target.value)
                setIsFilterApplied(true);
              }}
              
              type="text"
              name="search"
              placeholder="Try searching earrings , home decor etc..."
              className="  w-full p-4 sm:w-[96%] border text-amber-700 font-medium border-amber-300 outline-none rounded-l-lg bg-white placeholder:text-sm"
            />
            {searchText && (
              <X
                className="text-amber-500 absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
                size={20}
                onClick={()=> {setSearchText("")
                  setIsFilterApplied(false)
                }}
              />
            )}
            <button className="p-2 bg-amber-100 rounded-r-lg border border-l-0 border-amber-300 hover:cursor-pointer hover:bg-amber-300">
              <Search className="text-amber-500 " size={22} disabled />
            </button>
          </div>

          <button
            onClick={toggleFilter}
            className="flex items-center gap-1 text-amber-600 font-semibold hover:text-amber-700 transition"
          >
            <Filter size={20} /> Filters
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {productsToRender &&
            productsToRender.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

      {showFilter && (
        <div className="w-[20%] bg-white shadow-xl">
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
};

export default Products;
