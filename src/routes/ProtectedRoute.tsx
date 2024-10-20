import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;