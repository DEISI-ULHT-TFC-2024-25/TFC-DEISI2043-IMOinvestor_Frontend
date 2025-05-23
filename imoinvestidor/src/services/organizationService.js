import { api } from './apiClient';

export async function fetchOrganizations() {
  const { data, status } = await api.get('/organization/');
  if (status !== 200) {
    throw new Error(data.message || 'Erro ao buscar organizações.');
  }
  return data;
}

export async function getOrganizationById(id) {
  const { data, status } = await api.get(`/organization/${id}/`);
  if (status !== 200) {
    throw new Error(data.message || 'Erro ao obter organização.');
  }
  return data;
}
