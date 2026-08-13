import React, { useState } from 'react';
import { AuthContext } from './AuthContextStore';

export const AuthProvider = ({ children }) => {
  const initialUser = (() => {
    if (typeof window === 'undefined') return null;
    const loggedInUser = localStorage.getItem('currentUser');
    if (!loggedInUser) return null;

    try {
      const parsedUser = JSON.parse(loggedInUser);
      if (parsedUser?.userType === 'admin') {
        localStorage.removeItem('currentUser');
        return null;
      }
      return parsedUser;
    } catch {
      localStorage.removeItem('currentUser');
      return null;
    }
  })();

  const [user, setUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialUser));

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    if (userData?.userType !== 'admin') {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      if (next?.userType !== 'admin') {
        localStorage.setItem('currentUser', JSON.stringify(next));
      }
      return next;
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminMode');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
