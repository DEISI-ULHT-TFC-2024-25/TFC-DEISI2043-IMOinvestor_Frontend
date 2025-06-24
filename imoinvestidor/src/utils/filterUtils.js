export function buildPropertyFilters(filters = {}) {
  const query = {};

  if (filters.ordering?.trim()) {
    query.ordering = filters.ordering.trim();
  }

  if (filters.distrito) {
    query.district = filters.distrito;
  }
  if (filters.municipio) {
    query.municipality = filters.municipio;
  }

  const [minPrice, maxPrice] = filters.priceRange || [0, 2000000];
  if (minPrice > 0) {
    query.price_min = minPrice;
  }
  if (maxPrice < 2000000) {
    query.price_max = maxPrice;
  }

  if (filters.tipo?.trim()) {
    query.property_type = filters.tipo.trim();
  }

  if (filters.tipologia?.trim()) {
    query.typology = filters.tipologia.trim();
  }

  if (filters.casasBanho && filters.casasBanho !== '' && filters.casasBanho !== '0') {
    const n = parseInt(filters.casasBanho, 10);
    if (!isNaN(n) && n > 0) {
      query.num_wc = n;
    }
  }

  if (filters.novaConstrucao?.trim()) {
    query.new_construction = filters.novaConstrucao.trim();
  }

  if (filters.certificado?.trim()) {
    query.energy_cert = filters.certificado.trim();
  }

  // Area filters - API expects single values, not min/max variants
  // Gross area filter
  if (filters.areaBrutaMin) {
    const area = parseInt(filters.areaBrutaMin, 10);
    if (!isNaN(area) && area > 0) {
      query.gross_area = area;
    }
  } else if (filters.areaBrutaMax) {
    const area = parseInt(filters.areaBrutaMax, 10);
    if (!isNaN(area) && area > 0) {
      query.gross_area = area;
    }
  }

  // Net area filter
  if (filters.areaUtilMin) {
    const area = parseInt(filters.areaUtilMin, 10);
    if (!isNaN(area) && area > 0) {
      query.net_area = area;
    }
  } else if (filters.areaUtilMax) {
    const area = parseInt(filters.areaUtilMax, 10);
    if (!isNaN(area) && area > 0) {
      query.net_area = area;
    }
  }

  // Search term
  if (filters.searchTerm?.trim()) {
    query.search = filters.searchTerm.trim();
  }

  // Extra infos
  if (filters.extraInfos?.length > 0) {
    query.extra_infos = filters.extraInfos.join(',');
  }

  return query;
}