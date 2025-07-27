import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-full md:w-60 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink to="artisans" className="block text-gray-700 hover:text-amber-500">
          Unapproved Artisans
        </NavLink>
        <NavLink to="products" className="block text-gray-700 hover:text-amber-500">
          Unapproved Products
        </NavLink>
        <NavLink to="allorders" className="block text-gray-700 hover:text-amber-500">
          Orders
        </NavLink>
      </nav>
    </div>
  );
}

