import { useState } from 'react';
import { updateProperty } from '@services/propertyService';

export default function useUpdateProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUpdate = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      await updateProperty(id, data);
      return true;
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitUpdate, loading, error };
}