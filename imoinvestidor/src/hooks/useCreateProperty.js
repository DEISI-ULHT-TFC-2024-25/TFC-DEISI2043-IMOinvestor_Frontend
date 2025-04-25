import { useState } from 'react';
import { createProperty } from '@services/propertyService';

export default function useCreateProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdProperty, setCreatedProperty] = useState(null);

  const submitProperty = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProperty(data);
      setCreatedProperty(response);
      return true;
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitProperty, loading, error, createdProperty };
}