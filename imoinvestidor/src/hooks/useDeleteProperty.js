import { useState } from 'react';
import { deleteProperty } from '@services/propertyService';

export default function useDeleteProperty() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeProperty = async (id) => {
        setLoading(true);
        setError(null);
        
        try {
            await deleteProperty(id);
            return true;
        } catch (err) {
            console.error("Erro ao apagar:", err);      
            return false;
        } finally {
            setLoading(false);
        }
    };

  return { removeProperty, loading, error };
}
