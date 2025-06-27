import { createContext, useState, useEffect, useContext } from "react";
import * as authService from "@services/authService";
import PropTypes from "prop-types";
import ROLES from "@constants/roles.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const normalizeRoles = (roles) =>
    Array.isArray(roles) ? roles : roles ? [roles] : [];

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const roles = normalizeRoles(user?.role);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        hasRole: (role) => roles.includes(role),
        isAdmin: roles.includes(ROLES.SYS_ADMIN),
        isAgent: roles.includes(ROLES.AGENT),
        isInvestor: roles.includes(ROLES.INVESTOR),
        isPromotor: roles.includes(ROLES.PROMOTOR),
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};