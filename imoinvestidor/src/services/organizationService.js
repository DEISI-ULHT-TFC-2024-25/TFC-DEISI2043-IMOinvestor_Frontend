export const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/organization/list/", {
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
  