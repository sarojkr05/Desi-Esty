import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import DeniedPage from "./pages/DeniedPage"
import ArtisanDashboard from "./pages/ArtisanDashboard"
<<<<<<< HEAD
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

=======
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
>>>>>>> d962dfe2e79f00583527fb2c08507dc9ee3b77d5
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/artisan" element={<ArtisanDashboard />} />
<<<<<<< HEAD

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

=======
     
>>>>>>> d962dfe2e79f00583527fb2c08507dc9ee3b77d5
        <Route path="/denied" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
