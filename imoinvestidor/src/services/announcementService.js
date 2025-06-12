import { api } from './apiClient';

export async function fetchAnnouncements(filters = {}) {
  const response = await api.get('/announcement/', { params: filters });
  return response.data;
}

export async function fetchAnnouncementsByOrganization(ordering = '') {
  const params = ordering ? { ordering } : {};
  const response = await api.get('/announcement/my-organization/', { params });
  return response.data;
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