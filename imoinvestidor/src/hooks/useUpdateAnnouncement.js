import { useState } from 'react';
import { updateAnnouncement } from '@services/announcementService';

export default function useUpdateAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUpdate = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateAnnouncement(id, data);
      return updated;
    } catch (err) {
      setError(err.response?.data || 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitUpdate, loading, error };
}
