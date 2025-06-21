export function buildPropertyFilters(filters = {}) {
  const query = {};

  if (filters.tipo?.trim()) query.property_type = filters.tipo.trim();
  if (filters.tipologia?.trim()) query.tipologia = filters.tipologia.trim();

  if (filters.casasBanho && filters.casasBanho !== '' && filters.casasBanho !== '0') {
    const n = parseInt(filters.casasBanho, 10);
    if (!isNaN(n) && n > 0) query.numero_casas_banho = n;
  }

  if (filters.distrito) query.district = filters.distrito;
  if (filters.municipio) query.municipality = filters.municipio;

  if (filters.novaConstrucao?.trim()) query.nova_construcao = filters.novaConstrucao.trim();

  if (filters.certificado?.trim()) {
    query.certificado_energetico = filters.certificado.trim();
  }

  const [minPrice, maxPrice] = filters.priceRange || [0, 2000000];
  if (minPrice > 0) query.price_min = minPrice;
  if (maxPrice < 2000000) query.price_max = maxPrice;

  // Área útil n tem min e max atualmente, apenas 1 campo
  if (filters.areaUtilMin) {
    query.area_util = filters.areaUtilMin;
  } else if (filters.areaUtilMax) {
    query.area_util = filters.areaUtilMax;
  }

  // Área bruta n tem min e max atualmente, apenas 1 campo
  if (filters.areaBrutaMin) {
    query.area_bruta = filters.areaBrutaMin;
  } else if (filters.areaBrutaMax) {
    query.area_bruta = filters.areaBrutaMax;
  }

  if (filters.searchTerm?.trim()) {
    query.search = filters.searchTerm.trim();
  }

  if (filters.extraInfos?.length > 0) {
    query.extra_infos = filters.extraInfos.join(',');
  }

  if (filters.ordering) {
    query.ordering = filters.ordering;
  }

  return query;
}