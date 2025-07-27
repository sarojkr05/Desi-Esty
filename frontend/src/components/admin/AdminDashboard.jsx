import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 md:hidden z-20 bg-white p-2 rounded shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu />
      </button>

      {/* Sidebar: always visible on md+, toggled on mobile */}
      <div
        className={`z-10 fixed md:static h-full md:h-auto bg-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-60`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        <Topbar />
        <div className="p-4 overflow-y-auto flex-1 bg-gradient-to-br from-amber-50 to-orange-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
