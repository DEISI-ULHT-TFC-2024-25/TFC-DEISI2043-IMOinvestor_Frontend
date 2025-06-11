import { api } from './apiClient';

function normalizeUser(raw) {
  return {
    id: raw.id,
    userName: raw.user_name,
    password: raw.password,
    firstName: raw.first_name || '',
    lastName:  raw.last_name  || '',
    email:     raw.email,
    phone:     raw.phone || '',
    dateOfBirth: raw.date_of_birth || null,
    langKey:   raw.lang_key,
    activated: raw.activated,
    lastLogin: raw.last_login ? new Date(raw.last_login) : null,
    createdBy: raw.created_by,
    createdDate: raw.created_date ? new Date(raw.created_date) : null,
    lastModifiedBy: raw.last_modified_by || '',
    lastModifiedDate: raw.last_modified_date ? new Date(raw.last_modified_date) : null,
    institutionIds: Array.isArray(raw.institution_ids) ? raw.institution_ids : [],
    roleId: raw.role_id,
  };
}

export async function fetchUsers() {
  const { data } = await api.get('/user/');
  return data.map(normalizeUser);
}


export async function createUser(payload) {
  const { data } = await api.post('/user/create/', payload);
  return normalizeUser(data);
}


export async function loginUser(credentials) {
  const { data } = await api.post('/user/login/', credentials);

  return data;
}


export async function updateUser(payload) {
  const { data } = await api.put('/user/update/', payload);
  return normalizeUser(data);
}


export async function getUserById(id) {
  const { data } = await api.get(`/user/${id}/`);
  return normalizeUser(data);
}


export async function deleteUser(id) {
  await api.delete(`/user/${id}/delete/`);
  return { success: true };
}
