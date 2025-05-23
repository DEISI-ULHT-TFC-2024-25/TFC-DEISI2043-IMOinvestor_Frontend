import { api } from "./apiClient";

export async function fetchOrganizations() {
  try {
    const { data, status } = await api.get("/organization/");
    if (status !== 200) {
      throw new Error(data.message || "Erro ao buscar organizações.");
    }
    return data;
  } catch (error) {
    console.error("Erro ao carregar organizações:", error);
    throw error;
  }
}

export async function getOrganizationById(id) {
  try {
    const { data, status } = await api.get(`/organization/${id}/`);
    if (status !== 200) {
      throw new Error(data.message || "Erro ao obter organização.");
    }
    return data;
  } catch (error) {
    console.error("Erro ao obter organização:", error);
    throw error;
  }
}
