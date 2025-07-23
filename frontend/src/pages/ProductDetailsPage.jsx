import ProductDetailCard from "../components/ProductDetailCard";
import { CircleChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const ProductDetailsPage = () => {
  return (
      <div className="bg-[#FAF3E0] min-h-screen py-10">
        <div className="fixed top-20 left-6 flex items-center text-amber-500 font-bold gap-2 z-50">
          <Link to="/products">
            <CircleChevronLeft size={24} />
          </Link>
          <span className="hidden sm:inline">Back</span>
        </div>
        <ProductDetailCard />
      </div>
  );
};

export default ProductDetailsPage;
