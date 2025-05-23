const API_BASE = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL.replace(/\/$/, '');

function authHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function login({ user_name, password }) {
  const res = await fetch(`${API_BASE}/user/login/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ user_name, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Erro ao fazer login.');

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
    phone:         userData.phone,
    date_of_birth: userData.birthDate,
    lang_key:      (userData.preferredLanguage || 'PT').toUpperCase(),
    role_id:       parseInt(userData.role_id),
    activated:     true,
    created_by:    userData.email,
  };

  const res = await fetch(`${API_BASE}/user/create/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao registar utilizador.');
  return data;
}

export async function deleteUser(id) {
  const API_BASE = import.meta.env.DEV
    ? '/api'
    : import.meta.env.VITE_API_URL.replace(/\/$/, '');

  const token = localStorage.getItem('authToken');
  const res = await fetch(`${API_BASE}/user/${id}/delete/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 204) {
    const current = JSON.parse(localStorage.getItem('user') || '{}');
    if (current.id === id) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    return true;
  } else {
    let err;
    try {
      const data = await res.json();
      err = data.detail || data.message || res.statusText;
    } catch {
      err = res.statusText;
    }
    throw new Error(`Não foi possível eliminar o utilizador: ${err}`);
  }
}

export async function updateProfile(updates) {
  const stored = localStorage.getItem('user');
  if (!stored) throw new Error('Utilizador não autenticado.');

  const { id } = JSON.parse(stored);
  const res = await fetch(`${API_BASE}/user/update/`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro ao atualizar utilizador.');

  const newUser = { ...JSON.parse(stored), ...data };
  localStorage.setItem('user', JSON.stringify(newUser));

  return newUser;
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
