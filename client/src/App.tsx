import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from "./pages/signup-page"
import Homepage from "./pages/home-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
