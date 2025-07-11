import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import DeniedPage from "./pages/DeniedPage"
import ArtisanDashboard from "./pages/ArtisanDashboard"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/denied" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
