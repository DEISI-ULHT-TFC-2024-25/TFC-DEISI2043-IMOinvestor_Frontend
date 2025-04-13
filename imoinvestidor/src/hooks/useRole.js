import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const hasRole = (role) => {
    return user?.role?.includes(role);
  };

  const hasAnyRole = (roles) => {
    return roles.some((role) => hasRole(role));
  };

  return { hasRole, hasAnyRole };
};

export default useRole;
