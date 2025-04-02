import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.login(credentials);
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
    navigate('/login');
  };

  return {
    login,
    logout,
    error,
    loading,
    isAuthenticated: authService.isAuthenticated(),
  };
};