import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

function RoleRoute({ allowedRoles, children }) {
  const { isLoggedIn } = useAuth();
  const { hasAnyRole } = useRole();

  if (!isLoggedIn || !hasAnyRole(allowedRoles)) {
    return <Navigate to="/" replace />; //TODO criar um página de erro? atualmente manda apenas para o home
  }

  return children;
}

RoleRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleRoute;