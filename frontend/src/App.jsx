import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import DeniedPage from "./pages/DeniedPage"
import ArtisanDashboard from "./pages/ArtisanDashboard"
import Products from "./pages/Products"
import ProductDetailsPage from "./pages/ProductDetailsPage"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />
     
        <Route path="/denied" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

