export const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/organization/", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar organizações.");
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao carregar organizações:", error);
      throw error;
    }
};
  
export const getOrganizationById = async (id) => {
  try {
    const response = await fetch(`/api/organization/${id}/`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao obter organização.");
    }

    return data;
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
};