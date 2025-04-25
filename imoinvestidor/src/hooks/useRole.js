import useAuth from "@hooks/useAuth";

const useRole = () => {
  const { user } = useAuth();

  const hasRole = (roleLabel) => {
    if (!user?.role) return false;
    return user.role.includes(roleLabel);
  };

  const hasAnyRole = (roleLabels) => {
    if (!user?.role) return false;
    return roleLabels.some(label => user.role.includes(label));
  };

  return { hasRole, hasAnyRole };
};

export default useRole;
