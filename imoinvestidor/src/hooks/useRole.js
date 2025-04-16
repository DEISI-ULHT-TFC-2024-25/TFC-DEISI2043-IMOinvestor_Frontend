import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const hasRole = (roleId) => {
    return user?.role === roleId;
  };

  const hasAnyRole = (roleIds) => {
    return roleIds.includes(user?.role);
  };

  return { hasRole, hasAnyRole };
};

export default useRole;
