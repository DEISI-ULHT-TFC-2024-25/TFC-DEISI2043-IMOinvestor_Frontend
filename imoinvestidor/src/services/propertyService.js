const API_BASE = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL.replace(/\/$/, '');

function normalizeProperty(raw) {
  return {
    ...raw,
    imagens: Array.isArray(raw.imagens) ? raw.imagens : [],
    informacoes_adicionais: Array.isArray(raw.informacoes_adicionais)
      ? raw.informacoes_adicionais
      : [],
  };
}

export async function getProperties() {
  const res = await fetch(`${API_BASE}/property/`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  const list = await res.json();
  return list.map(normalizeProperty);
}

export async function getPropertiesByOrganization(orgId) {
  const res = await fetch(`${API_BASE}/property/organization/${orgId}/`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  const list = await res.json();
  return list.map(normalizeProperty);
}

export async function getPropertyById(id) {
  const res = await fetch(`${API_BASE}/property/${id}/`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  const raw = await res.json();
  return normalizeProperty(raw);
}

export async function createProperty(data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || res.statusText);
  }
  const raw = await res.json();
  return normalizeProperty(raw);
}

export async function updateProperty(id, data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/update/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || res.statusText);
  }
  const raw = await res.json();
  return normalizeProperty(raw);
}

export async function partialUpdateProperty(id, data, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/update/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || res.statusText);
  }
  const raw = await res.json();
  return normalizeProperty(raw);
}

export async function deleteProperty(id, csrfToken = '') {
  const res = await fetch(`${API_BASE}/property/${id}/delete/`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || res.statusText);
  }
  return { success: true };
}
