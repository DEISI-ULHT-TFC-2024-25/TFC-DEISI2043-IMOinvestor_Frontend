import { useState, useEffect } from 'react';
import { fetchDistricts } from '@services/districtService';

export default function useDistricts() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const list = await fetchDistricts();
        setDistricts(list);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar distritos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { districts, loading, error };
}
