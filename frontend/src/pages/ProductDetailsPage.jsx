import ProductDetailCard from "../components/ProductDetailsCard";
import { CircleChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
const ProductDetailsPage = () => {
  return (
        <div className="bg-[#FAF3E0] min-h-screen py-10">
          <div className="fixed top-30 left-10 flex text-amber-500 font-bold gap-3">
            <Link to="/products">
              <CircleChevronLeft className="text-amber-500" size={24} />
            </Link>
          </div>
          <ProductDetailCard />
        </div>
  );
};

export default ProductDetailsPage;