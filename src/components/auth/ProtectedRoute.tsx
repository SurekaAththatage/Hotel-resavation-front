import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser, UserRole } from '../../contexts/UserContext';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useUser();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Check if user is authenticated and has the required role
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;