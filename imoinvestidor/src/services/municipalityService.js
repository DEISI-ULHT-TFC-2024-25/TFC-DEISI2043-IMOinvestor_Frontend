import { api } from './apiClient';

export async function loadAllMunicipalities() {
  const { data, status } = await api.get('/municipality/');
  if (status !== 200) {
    throw new Error('Erro ao carregar municípios.');
  }
  return data;
}

export async function loadByDistrict(districtId) {
  const { data, status } = await api.post('/municipality/by-district/', {
    district_id: Number(districtId),
  });
  if (status !== 200) {
    throw new Error('Erro ao carregar municípios do distrito.');
  }
  return data;
}
