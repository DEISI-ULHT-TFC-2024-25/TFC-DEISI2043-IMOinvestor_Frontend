import { useEffect, useState } from 'react';
import { getUser } from '@services/authService';
import { getOrganizationById } from '@services/organizationService';
import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncements } from '@services/announcementService';

export default function MyAnnouncements() {
  const user = getUser();
  const orgId = user?.organization_ids?.[0];
  const [orgName, setOrgName] = useState('Organização');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orgId) {
      getOrganizationById(orgId)
        .then(org => setOrgName(org.name))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orgId]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">A carregar anúncios…</p>;
  if (!user || !orgId)
    return <p className="p-6 text-center text-red-600">Organização não encontrada.</p>;

  return (
    <AnnouncementsManager
      title={`Anúncios da Organização: ${orgName}`}
      fetchAnnouncements={() => fetchAnnouncements({ organization: orgId })}
      showView
      showEdit
      showDelete
      emptyStateMessage={`Ainda não existem anúncios para ${orgName}.`}
    />
  );
}