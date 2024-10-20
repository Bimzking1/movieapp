import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  component: React.ComponentType;
  restricted: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, restricted }) => {
  return restricted ? <Navigate to="/dashboard" /> : <Component />;
};

export default PublicRoute;