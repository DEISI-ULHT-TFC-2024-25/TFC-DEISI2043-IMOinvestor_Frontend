import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(authService.getUser()); // Get user data from localStorage initially
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getUser()); // Sync user state with localStorage
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser); // Update user state
      setLoading(false);
      navigate('/');
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return {
    login,
    logout,
    user,
    isLoggedIn: !!user,
    error,
    loading,
  };
};
