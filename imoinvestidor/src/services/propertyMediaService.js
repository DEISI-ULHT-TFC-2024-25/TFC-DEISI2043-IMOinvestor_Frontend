import { api } from './apiClient';

export async function getPropertyMedias() {
  const { data, status } = await api.get('/property-media/');
  if (status !== 200) {
    throw new Error('Erro ao listar media de propriedades.');
  }
  return data;
}

export async function getPropertyMediaById(id) {
  const { data, status } = await api.get(`/property-media/${id}/`);
  if (status !== 200) {
    throw new Error('Erro ao obter media da propriedade.');
  }
  return data;
}

export async function getPropertyMediasByProperty(propertyId) {
  const { data, status } = await api.get('/property-media/', {
    params: { property: propertyId }
  });
  if (status !== 200) {
    throw new Error('Erro ao listar media da propriedade.');
  }
  return data;
}

export async function createPropertyMedia({ file, mediaType = 'image', propertyId }) {
  const form = new FormData();
  form.append('file', file);
  form.append('media_type', mediaType); // "image" ou "video"
  form.append('property', String(propertyId));

  const { data, status } = await api.post('/property-media/', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (status !== 201) {
    throw new Error('Erro ao criar media da propriedade.');
  }
  return data;
}

export async function updatePropertyMedia(id, { file, mediaType, propertyId }) {
  const form = new FormData();
  if (file)       form.append('file', file);
  if (mediaType)  form.append('media_type', mediaType); // "image" ou "video"
  if (propertyId) form.append('property', String(propertyId));

  const { data, status } = await api.put(`/property-media/${id}/`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (status !== 200) {
    throw new Error('Erro ao atualizar media da propriedade.');
  }
  return data;
}

export async function deletePropertyMedia(id) {
  const { status } = await api.delete(`/property-media/${id}/`);
  if (status !== 204) {
    throw new Error('Erro ao eliminar media da propriedade.');
  }
  return true;
}
