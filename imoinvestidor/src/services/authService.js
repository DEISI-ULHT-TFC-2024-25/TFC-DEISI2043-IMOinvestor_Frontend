export const login = async ({ user_name, password }) => {
  try {
    const response = await fetch("/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_name, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao fazer login.");
    }

    const userData = {
      id: data.user_id,
      user_name: data.user_name,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      lang_key: data.lang_key,
      activated: data.activated,
      organization_ids: data.organization_ids || [],
      role: data.role || [],
    };

    localStorage.setItem("authToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Erro no login:", error.message);
    throw error;
  }
};

export const register = async (userData) => {
  const requiresOrganization = ["4", "5"].includes(userData.role_id); // 4 = AGENT, 5 = PROMOTER

  const payload = {
    institution_ids:
      requiresOrganization && userData.organization
        ? [parseInt(userData.organization)]
        : [0],
    user_name: userData.email,
    password: userData.password,
    first_name: userData.name,
    last_name: userData.surname,
    email: userData.email,
    phone: userData.phone,
    date_of_birth: userData.birthDate,
    lang_key: userData.preferredLanguage?.toUpperCase() || "PT",
    role_id: parseInt(userData.role_id),
    activated: true,
    created_by: userData.email,
  };

  const response = await fetch("/api/user/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Erro detalhado:", data);
    throw new Error(data.message || "Erro ao registar utilizador.");
  }

  return data;
};

export const getUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.log(e);
    localStorage.removeItem("user");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const updateUser = (userData) => {
  const currentUser = getUser();
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return updatedUser;
};