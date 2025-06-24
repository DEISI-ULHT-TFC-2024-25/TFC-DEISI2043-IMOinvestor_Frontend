import { api } from './apiClient';
import { buildPropertyFilters } from '@utils/filterUtils';

export async function fetchAnnouncements(filters = {}) {
  const query = buildPropertyFilters(filters);
  query.expand = 'property';

  const response = await api.get('/announcement/', { params: query });
  return response.data;
}

export async function fetchAnnouncementsByOrganization(filters = {}, ordering = '') {
  const query = buildPropertyFilters(filters);
  query.expand = 'property';
  if (ordering) query.ordering = ordering;

  const { data } = await api.get('/announcement/my-organization/', { params: query });
  return data;
}

export async function fetchAnnouncementById(id) {
  const response = await api.get(`/announcement/${id}/`);
  return response.data;
}

export async function createAnnouncement(data) {
  const response = await api.post('/announcement/', data);
  return response.data;
}

export async function updateAnnouncement(id, data) {
  const response = await api.put(`/announcement/${id}/`, data);
  return response.data;
}

export async function deleteAnnouncement(id) {
  await api.delete(`/announcement/${id}/`);
  return true;
}

export function normalizeFiltersForAnnouncement(filters = {}) {
  return {
    ...filters,
    tipo: filters.property_type,
    distrito: filters.district,
    municipio: filters.municipality,
    novaConstrucao: filters.new_construction,
    certificado: filters.energy_cert,
    casasBanho: filters.num_wc,
    areaUtilMin: filters.net_area,
    areaBrutaMin: filters.gross_area,
  };
} 