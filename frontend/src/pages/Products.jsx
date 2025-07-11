import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Layout from "../layout/Layout"
import { products ,categories } from "../utils/constants";


const Products = () => {
  return (
    <>
   <Layout>
    <div className="min-h-screen bg-[#FAF3E0] py-10 px-4 ">
      {/* 🔍 Search and Filter */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <div className="flex">
          <input
            type="text"
            name="search"
            placeholder="Try searching jewelry, pottery..."
            className="w-72 p-2 border text-amber-600 font-semibold border-amber-300 outline-none rounded-l-lg bg-white"
          />
          <button className="p-2 bg-amber-100 rounded-r-lg">
            <Search className="text-amber-500 cursor-pointer" size={22} />
          </button>
        </div>
        <button className="flex items-center gap-1 text-amber-600 font-medium hover:text-amber-700">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* 🧵 Categories */}
      <div className="bg-amber-200 mt-10 p-6 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-amber-600 mb-6">
          Explore By Categories
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="h-10 px-5 rounded-xl font-medium transition bg-white text-amber-700 hover:bg-amber-100"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
       
      {
        products.map((item)=>(
            <ProductCard key={item.id} data={item}/>
        ))
        

        
        
      } 

         
       
      </div>
    </div>
    </Layout>
     </>
  );
};

export default Products;
