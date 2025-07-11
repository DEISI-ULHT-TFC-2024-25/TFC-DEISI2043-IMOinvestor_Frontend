import { api } from './apiClient';

export async function login({ user_name, password }) {
  const { data, status } = await api.post('/user/login/', { user_name, password });
  if (status !== 200) {
    throw new Error(data.detail || 'Erro ao fazer login.');
  }

  const userData = {
    id:               data.user_id,
    user_name:        data.user_name,
    first_name:       data.first_name,
    last_name:        data.last_name,
    email:            data.email,
    phone:            data.phone,
    date_of_birth:    data.date_of_birth,
    lang_key:         data.lang_key,
    activated:        data.activated,
    organization_ids: data.organization_ids || [],
    role:             data.role || [],
  };

  localStorage.setItem('authToken',    data.access_token);
  localStorage.setItem('refreshToken', data.refresh_token);
  localStorage.setItem('user',         JSON.stringify(userData));

  return userData;
}

export async function register(userData) {
  const needsOrg = ['4', '5'].includes(userData.role_id);
  const payload = {
    institution_ids:
      needsOrg && userData.organization
        ? [parseInt(userData.organization)]
        : [0],
    user_name:     userData.email,
    password:      userData.password,
    first_name:    userData.name,
    last_name:     userData.surname,
    email:         userData.email,
    phone:         userData.phone_number, // Fixed: was userData.phone, should be userData.phone_number
    date_of_birth: userData.birthDate,
    lang_key:      (userData.preferredLanguage || 'PT').toUpperCase(),
    role_id:       parseInt(userData.role_id),
    activated:     true,
    created_by:    userData.email,
  };

  console.log('Sending registration payload:', payload); // Debug log

  try {
    const { data, status } = await api.post('/user/create/', payload); // Changed from '/user/' to '/user/create/'
    if (status !== 201 && status !== 200) {
      throw new Error(data.message || 'Erro ao registar utilizador.');
    }
    return data;
  } catch (error) {
    console.error('Registration error details:', error.response?.data);
    throw new Error(error.response?.data?.message || error.message || 'Erro ao registar utilizador.');
  }
}


export async function updateProfile(updates) {
  const stored = localStorage.getItem('user');
  if (!stored) throw new Error('Utilizador não autenticado.');

  const { data, status } = await api.put('/user/update/', updates); 
  if (status !== 200) {
    throw new Error(data.message || 'Erro ao atualizar utilizador.');
  }

  const newUser = { ...JSON.parse(stored), ...updates, ...data }; // funde as novas atualizações
  localStorage.setItem('user', JSON.stringify(newUser));
  return newUser;
}

export async function deleteUser(id) {
  const response = await api.delete(`/user/${id}/delete/`);
  if (response.status === 204) {
    const current = JSON.parse(localStorage.getItem('user') || '{}');
    if (current.id === id) logout();
    return true;
  }
  throw new Error('Não foi possível eliminar o utilizador.');
}


export function updateUser(updates) {
  const stored = localStorage.getItem('user');
  if (!stored) return null;
  const current = JSON.parse(stored);
  const merged = { ...current, ...updates };
  localStorage.setItem('user', JSON.stringify(merged));
  return merged;
}

export function getUser() {
  const s = localStorage.getItem('user');
  return s ? JSON.parse(s) : null;
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}
