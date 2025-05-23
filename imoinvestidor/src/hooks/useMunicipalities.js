import { useState, useEffect, useCallback } from 'react';
import { loadAllMunicipalities, loadByDistrict } from '@services/municipalityService';

export default function useMunicipalities(initialDistrictId = null) {
  const [municipalities, setMunicipalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    async (districtId = null) => {
      setLoading(true);
      setError(null);
      try {
        const data = districtId
          ? await loadByDistrict(districtId)
          : await loadAllMunicipalities();
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setMunicipalities(sorted);
        return sorted;
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar municípios');
        setMunicipalities([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetch(initialDistrictId);
  }, [initialDistrictId, fetch]);

  return {
    municipalities,
    loadByDistrict: fetch,
    setMunicipalities,
    loading,
    error,
  };
}
