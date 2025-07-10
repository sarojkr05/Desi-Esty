import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import DeniedPage from "./pages/DeniedPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/denied" element={<DeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
