import ProductDetailCard from "../components/ProductDetailCard";
import { CircleChevronLeft } from "lucide-react";

import Layout from "../layout/Layout"
const ProductDetailsPage = () => {
 

  return (
    <>
      <Layout>
        <div className="bg-[#FAF3E0] min-h-screen py-10">
          <div className="fixed top-10 left-10">
            <CircleChevronLeft className="text-amber-500 " size={24} />
          </div>
          <ProductDetailCard />
        </div>
      </Layout>
    </>
  );
};

export default ProductDetailsPage;
