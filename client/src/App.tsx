import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from "./pages/signup-page"
import Homepage from "./pages/home-page";
import LoginPage from './pages/login-page';
import ProfilePage from './pages/profile-page';
import PublicRoute from './components/routes/public-route';
import ProtectedRoute from './components/routes/protected-route';
import DashboardPage from './pages/dashboard-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
