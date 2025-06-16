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

export async function fetchProperties(filters = {}) {
  const query = {};

  // Property type filter
  if (filters.tipo) {
    query.property_type = filters.tipo;
  }

  // Tipologia filter - add debug logging
  if (filters.tipologia && filters.tipologia.trim()) {
    query.tipologia = filters.tipologia.trim();
    console.log('Tipologia filter applied:', query.tipologia);
  }

  // Casas de banho (bathrooms) filter - add debug logging and validation
  if (filters.casasBanho && filters.casasBanho !== '' && filters.casasBanho !== '0') {
    // Convert to number if it's a string
    const bathrooms = typeof filters.casasBanho === 'string' 
      ? parseInt(filters.casasBanho, 10) 
      : filters.casasBanho;
    
    if (!isNaN(bathrooms) && bathrooms > 0) {
      query.numero_casas_banho = bathrooms;
      console.log('Casas de banho filter applied:', query.numero_casas_banho);
    }
  }

  // Location filters
  if (filters.distrito) {
    query.district = filters.distrito;
  }
  if (filters.municipio) {
    query.municipality = filters.municipio;
  }

  // Nova construção filter
  if (filters.novaConstrucao) {
    query.nova_construcao = filters.novaConstrucao;
  }

  // Energy certificate filter - add debug logging and validation
  if (filters.certificado && filters.certificado.trim()) {
    query.certificado_energetico = filters.certificado.trim();
    console.log('Certificado energético filter applied:', query.certificado_energetico);
  }

  // Price range handling - fix the logic
  const [minPrice, maxPrice] = filters.priceRange || [0, 2000000];
  
  // Only send price filters if they're different from defaults
  if (minPrice && minPrice > 0) {
    query.preco_minimo = minPrice;
  }
  if (maxPrice && maxPrice < 2000000) {
    query.preco_maximo = maxPrice;
  }

  // Area filters - fix the overwriting issue
  if (filters.areaUtilMin) {
    query.area_util_min = filters.areaUtilMin;
  }
  if (filters.areaUtilMax) {
    query.area_util_max = filters.areaUtilMax;
  }

  if (filters.areaBrutaMin) {
    query.area_bruta_min = filters.areaBrutaMin;
  }
  if (filters.areaBrutaMax) {
    query.area_bruta_max = filters.areaBrutaMax;
  }

  // Search term
  if (filters.searchTerm && filters.searchTerm.trim()) {
    query.search = filters.searchTerm.trim();
  }

  // Extra infos - if your API supports filtering by additional info
  if (filters.extraInfos && filters.extraInfos.length > 0) {
    query.extra_infos = filters.extraInfos.join(',');
  }

  console.log('Full API Query Parameters:', query);
  console.log('Original filters received:', filters);

  try {
    const { data } = await api.get('/property/', { params: query });
    console.log('API Response:', data);
    console.log('Number of properties returned:', data.length);
    return data.map(normalizeProperty);
  } catch (error) {
    console.error('fetchProperties error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
}

export async function getPropertiesByOrganization() {
  const { data } = await api.get(`/property/my-organization/`);
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

export async function getPropertiesWithAnnouncement() {
  const { data } = await api.get('/property/with-announcement/');
  return data.map(normalizeProperty);
}

export async function getPropertiesWithoutAnnouncement() {
  const { data } = await api.get('/property/without-announcement/');
  return data.map(normalizeProperty);
}