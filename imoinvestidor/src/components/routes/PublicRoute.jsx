import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />; //TODO criar um página de erro? atualmente manda apenas para o home
  }

  return children;
}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute