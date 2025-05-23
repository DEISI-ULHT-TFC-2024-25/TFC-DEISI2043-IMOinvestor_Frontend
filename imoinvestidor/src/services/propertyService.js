import { api } from './apiClient';

function normalizeProperty(raw) {
  return {
    ...raw,
    imagens: Array.isArray(raw.imagens) ? raw.imagens : [],
    informacoes_adicionais: Array.isArray(raw.informacoes_adicionais)
      ? raw.informacoes_adicionais
      : [],
    casasBanho: raw.numero_casas_banho ?? '0',
    title: raw.name,
  };
}

export async function getProperties() {
  const { data } = await api.get('/property/');
  return data.map(normalizeProperty);
}

export async function getPropertiesByOrganization(orgId) {
  const { data } = await api.get(`/property/organization/${orgId}/`);
  return data.map(normalizeProperty);
}

export async function getPropertyById(id) {
  const { data } = await api.get(`/property/${id}/`);
  return normalizeProperty(data);
}

export async function createProperty(payload) {
  const { data } = await api.post('/property/', payload);
  return normalizeProperty(data);
}

export async function updateProperty(id, payload) {
  const { data } = await api.put(`/property/${id}/`, payload);
  return normalizeProperty(data);
}

export async function partialUpdateProperty(id, payload) {
  const { data } = await api.patch(`/property/${id}/`, payload);
  return normalizeProperty(data);
}

export async function deleteProperty(id) {
  await api.delete(`/property/${id}/`);
  return { success: true };
}
