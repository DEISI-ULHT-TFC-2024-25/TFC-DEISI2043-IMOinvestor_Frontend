import { api } from './apiClient';
import ROLES from '../constants/roles';

// converte role_id → string
const ROLE_MAP = {
  1: ROLES.SYS_ADMIN,
  2: ROLES.USER,
  3: ROLES.INVESTOR,
  4: ROLES.AGENT,
  5: ROLES.PROMOTOR,
};

function normalizeUser(raw) {
  return {
    id:              raw.id,
    userName:        raw.user_name,
    firstName:       raw.first_name    || '',
    lastName:        raw.last_name     || '',
    email:           raw.email,
    phone:           raw.phone         || '',
    dateOfBirth:     raw.date_of_birth || null,
    langKey:         raw.lang_key,
    activated:       raw.activated,
    lastLogin:       raw.last_login
                       ? new Date(raw.last_login)
                       : null,
    createdBy:       raw.created_by    || '',
    createdDate:     raw.created_date
                       ? new Date(raw.created_date)
                       : null,
    lastModifiedBy:  raw.last_modified_by || '',
    lastModifiedDate: raw.last_modified_date
                       ? new Date(raw.last_modified_date)
                       : null,
    institutionIds:  Array.isArray(raw.institution_ids)
                       ? raw.institution_ids
                       : [],
    roleId:          raw.role_id,
    role:            raw.role,
  };
}

// GET /user/
export async function fetchUsers() {
  const { data } = await api.get('/user/');
  return data.map(normalizeUser);
}

// POST /user/create/
export async function createUser(payload) {
  const { data } = await api.post('/user/create/', payload);
  return normalizeUser(data);
}

// POST /user/login/
export async function loginUser(credentials) {
  const { data } = await api.post('/user/login/', credentials);
  return data; 
}

// PUT /user/update/  (atualiza o current user)
export async function updateUser(payload) {
  const { data } = await api.put('/user/update/', payload);
  return normalizeUser(data);
}

// GET /user/{id}/
export async function getUserById(id) {
  const { data } = await api.get(`/user/${id}/`);
  return normalizeUser(data);
}

// DELETE /user/{id}/delete/
export async function deleteUser(id) {
  await api.delete(`/user/${id}/delete/`);
  return { success: true };
}
