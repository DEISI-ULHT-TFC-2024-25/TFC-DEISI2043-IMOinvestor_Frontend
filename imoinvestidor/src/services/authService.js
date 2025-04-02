export const login = async (credentials) => {
    const response = await fetch('/api/user/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao fazer login");
    }

    localStorage.setItem("authToken", data.token);
    return data;
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};