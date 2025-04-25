import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute