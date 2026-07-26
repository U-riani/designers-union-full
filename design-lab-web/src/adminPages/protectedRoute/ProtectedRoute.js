import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login/" />;
};

export default ProtectedRoute;
