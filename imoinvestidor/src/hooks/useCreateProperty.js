import { useState } from 'react';
import { createProperty } from '../services/propertyService';

export default function useCreateProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitProperty = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createProperty(data);
      return true;
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitProperty, loading, error };
}