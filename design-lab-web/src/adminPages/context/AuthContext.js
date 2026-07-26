// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state if needed

  const logout = (navigate) => {
    console.log('Logging out...');
    localStorage.removeItem('token'); // Remove the token
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
