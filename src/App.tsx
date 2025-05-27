import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { HotelProvider } from './contexts/HotelContext';
import { ReservationProvider } from './contexts/ReservationContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RoomListingPage from './pages/RoomListingPage';
import RoomDetailPage from './pages/RoomDetailPage';
import ReservationPage from './pages/ReservationPage';
import MyReservationsPage from './pages/MyReservationsPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <UserProvider>
        <HotelProvider>
          <ReservationProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="rooms" element={<RoomListingPage />} />
                <Route path="rooms/:id" element={<RoomDetailPage />} />
                <Route path="reservation/:roomId" element={<ReservationPage />} />
                <Route path="checkout/:reservationId" element={<CheckoutPage />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute allowedRoles={['user', 'clerk', 'admin']} />}>
                  <Route path="my-reservations" element={<MyReservationsPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="admin" element={<AdminDashboardPage />} />
                </Route>
                
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ReservationProvider>
        </HotelProvider>
      </UserProvider>
    </Router>
  );
}

export default App;