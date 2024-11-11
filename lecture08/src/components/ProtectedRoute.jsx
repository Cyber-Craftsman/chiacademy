import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
