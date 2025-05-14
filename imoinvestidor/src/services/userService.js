export const updateUserProfile = async (payload) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch("/api/user/update/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao atualizar utilizador.");
  }

  return data;
};