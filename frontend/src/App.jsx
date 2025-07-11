import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import DeniedPage from "./pages/DeniedPage"
import ArtisanDashboard from "./pages/ArtisanDashboard"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />
     
        <Route path="/denied" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
