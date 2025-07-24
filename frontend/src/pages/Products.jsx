import { useState, useEffect } from "react";
import { fetchApprovedProducts } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ProductsPresentation from "./ProductsPresentation";

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
    <ProductsPresentation 
      productsToRender={productsToRender}
      toggleFilter={toggleFilter}
      showFilter={showFilter}
      handleApplyFilters={handleApplyFilters}
      isFilterApplied={isFilterApplied}
      searchText={searchText}
      setSearchText={setSearchText}
      setIsFilterApplied={setIsFilterApplied}
      setShowfilter={setShowfilter}
    />
  )
};

export default Products;
