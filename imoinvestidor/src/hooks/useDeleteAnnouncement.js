import { useState } from 'react';
import { deleteAnnouncement } from '@services/announcementService';

export default function useDeleteAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeAnnouncement = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteAnnouncement(id);
      return true;
    } catch (err) {
      console.error('Erro ao apagar anúncio:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeAnnouncement, loading, error };
}
