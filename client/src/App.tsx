import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from "./pages/signup-page"
import Homepage from "./pages/home-page";
import LoginPage from './pages/login-page';
import ProfilePage from './pages/profile-page';
import PublicRoute from './components/routes/public-route';
import ProtectedRoute from './components/routes/protected-route';
import DashboardPage from './pages/dashboard-page';
import HomeLayout from './components/layouts/home-layout';

function App() {

  const { isAuthenticated, getProfile } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout><Homepage /></HomeLayout>} />
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
