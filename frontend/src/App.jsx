// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DeniedPage from "./pages/DeniedPage";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import RequiredAuth from "./components/RequiredAuth";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/denied" element={<DeniedPage />} />

        {/* Artisan Dashboard */}
        <Route element={<RequiredAuth allowedRoles={["artisan"]} />}>
          <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />
        </Route>

        {/* Admin Dashboard */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>

        {/* Shared Routes */}
        <Route element={<RequiredAuth allowedRoles={["user", "artisan"]} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
