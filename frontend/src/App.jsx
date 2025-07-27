// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DeniedPage from "./pages/DeniedPage";
import OrderPage from "./pages/OrderPage";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import RequiredAuth from "./components/RequiredAuth";
import Cart from "./components/Cart";
import AddProducts from "./components/artisan/AddProducts";
import UserProfile from "./pages/UserProfile";
import ViewProducts from "./components/artisan/ViewProducts";
import EditProducts from "./components/artisan/EditProducts";
import CheckoutPage from "./pages/CheckoutPage";
import UnapprovedArtisans from "./components/admin/UnApprovedArtisans";
import UnapprovedProducts from "./components/admin/UnApprovedProducts";
import OrdersList from "./components/admin/OrdersList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/denied" element={<DeniedPage />} />
        <Route path="/user-profile" element={<UserProfile />}></Route>

        {/* Artisan Dashboard */}
        <Route element={<RequiredAuth allowedRoles={["artisan"]} />}>
          <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />
        </Route>
        <Route path="/add-product" element={<AddProducts />}></Route>
        <Route path="/view-products" element={<ViewProducts />}></Route>
        <Route path="/edit-product/:id" element={<EditProducts />}></Route>

        {/* Admin Dashboard */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="artisans" />} />
            <Route path="artisans" element={<UnapprovedArtisans />} />
            <Route path="products" element={<UnapprovedProducts />} />
            <Route path="allorders" element={<OrdersList />}></Route>
          </Route>
        </Route>

        {/* Shared Routes */}
        <Route element={<RequiredAuth allowedRoles={["user", "artisan"]} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
