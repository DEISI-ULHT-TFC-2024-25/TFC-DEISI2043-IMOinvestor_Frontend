import { api } from './apiClient';

export async function fetchDistricts() {
  const { data, status } = await api.get('/district/');
  if (status !== 200) {
    throw new Error('Erro ao carregar distritos.');
  }
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getDistrictById(id) {
  const { data, status } = await api.get(`/district/${id}/`);
  if (status !== 200) {
    throw new Error('Erro ao obter distrito.');
  }
  return data;
}

export async function createDistrict(payload) {
  const { data, status } = await api.post('/district/', payload);
  if (![200, 201].includes(status)) {
    throw new Error('Erro ao criar distrito.');
  }
  return data;
}

export async function updateDistrict(id, payload) {
  const { data, status } = await api.put(`/district/${id}/`, payload);
  if (status !== 200) {
    throw new Error('Erro ao atualizar distrito.');
  }
  return data;
}

export async function deleteDistrict(id) {
  const { status } = await api.delete(`/district/${id}/`);
  if (status !== 204) {
    throw new Error('Erro ao eliminar distrito.');
  }
  return true;
}
