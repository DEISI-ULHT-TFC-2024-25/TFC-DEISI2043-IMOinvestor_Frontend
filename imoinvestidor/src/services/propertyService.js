const API_BASE = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL.replace(/\/$/, '');

function authHeaders(csrfToken = '') {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}


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

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || res.statusText);
  }

  if (res.status === 204) return null;

  return res.json();
}

export async function getProperties() {
  const res = await fetch(`${API_BASE}/property/`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const list = await handleResponse(res);
  return list.map(normalizeProperty);
}

export async function getPropertiesByOrganization(orgId) {
  const res = await fetch(`${API_BASE}/property/organization/${orgId}/`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const list = await handleResponse(res);
  return list.map(normalizeProperty);
}

export async function getPropertyById(id) {
  const res = await fetch(`${API_BASE}/property/${id}/`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const raw = await handleResponse(res);
  return normalizeProperty(raw);
}

export async function createProperty(data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/create/`, {
    method: 'POST',
    headers: authHeaders(csrfToken),
    body: JSON.stringify(data),
  });
  const raw = await handleResponse(res);
  return normalizeProperty(raw);
}

export async function updateProperty(id, data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/update/`, {
    method: 'PUT',
    headers: authHeaders(csrfToken),
    body: JSON.stringify(data),
  });
  const raw = await handleResponse(res);
  return normalizeProperty(raw);
}

export async function partialUpdateProperty(id, data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/update/`, {
    method: 'PATCH',
    headers: authHeaders(csrfToken),
    body: JSON.stringify(data),
  });
  const raw = await handleResponse(res);
  return normalizeProperty(raw);
}

export async function deleteProperty(id, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/delete/`, {
    method: 'DELETE',
    headers: authHeaders(csrfToken),
  });



  await handleResponse(res);
  return { success: true };
}
