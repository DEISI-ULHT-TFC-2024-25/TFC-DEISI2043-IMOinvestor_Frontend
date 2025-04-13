import { createContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import PropTypes from "prop-types";
import ROLES from "../constants/roles.js";


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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        hasRole: (role) => user?.role?.includes(role),
        isAdmin: user?.role?.includes(ROLES.SYS_ADMIN),
        isAgent: user?.role?.includes(ROLES.AGENT),
        isInvestor: user?.role?.includes(ROLES.INVESTOR),
        isPromotor: user?.role?.includes(ROLES.PROMOTOR),
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