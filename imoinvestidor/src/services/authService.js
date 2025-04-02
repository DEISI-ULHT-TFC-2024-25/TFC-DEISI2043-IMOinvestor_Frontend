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
    
    const userData = {
      name: data.user_name || data.name || credentials.user_name,
      id: data.user_id || data.id,
    };
    
    localStorage.setItem("user", JSON.stringify(userData));
    
    return userData;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch (error) {
    console.log(error)
    localStorage.removeItem("user");
    return null;
  }
};

// Update user data
export const updateUser = (userData) => {
  const currentUser = getUser();
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return updatedUser;
};

export const register = async (userData) => {
    const response = await fetch('/api/user/register/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao registrar");
    }

    return data;
};