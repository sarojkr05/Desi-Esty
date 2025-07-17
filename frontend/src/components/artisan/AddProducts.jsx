const AddProducts = () => {
  return (
    <div className="min-h-screen flex justify-center items-start bg-white px-4 py-10">
      <div className="w-full max-w-xl bg-white p-4 space-y-6">
        <h1 className="text-2xl font-bold text-amber-700 text-center">Add New Product</h1>

        <div>
          <label className="block text-sm text-amber-700 mb-1">Title</label>
          <input type="text" placeholder="Product title" className="w-full border p-2 rounded focus:outline-none focus:border-amber-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-amber-700 mb-1 ">Category</label>
            <select className="w-full border p-2 rounded focus:outline-none  focus:border-amber-500">
              <option>Category 1</option>
              <option>Category 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-amber-700 mb-1">Subcategory</label>
            <select className="w-full border p-2 rounded focus:outline-none focus:border-amber-500">
              <option>Subcategory 1</option>
              <option>Subcategory 2</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-amber-700 mb-1">Product Image(s)</label>
          <input type="file" className="w-full border p-2 rounded focus:outline-none focus:border-amber-500" />
        </div>

        <div>
          <label className="block text-sm text-amber-700 mb-1">Detailed Description</label>
          <textarea rows="4" className="w-full border p-2 focus:outline-none focus:border-amber-500 rounded" placeholder="Write here..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-amber-700 mb-1">Price</label>
            <input type="number" className="w-full border-2  focus:outline-none focus:border-amber-500 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm text-amber-700 mb-1">Discount %</label>
            <input type="number" className="w-full border focus:outline-none focus:border-amber-500 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm text-amber-700 mb-1">Qauntity</label>
            <input type="number" className="w-full focus:outline-none focus:border-amber-500 border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-amber-700 mb-1">Availability</label>
          <select className="w-full focus:outline-none focus:border-amber-500 border p-2 rounded">
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div className="text-center">
          <button className="bg-amber-500 text-white px-5 py-2 rounded font-semibold hover:bg-amber-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
