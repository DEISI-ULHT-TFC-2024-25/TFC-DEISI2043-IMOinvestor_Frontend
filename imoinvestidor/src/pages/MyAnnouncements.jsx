import { useEffect, useState } from 'react';
import { getUser } from '@services/authService';
import { getOrganizationById } from '@services/organizationService';
import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncementsByOrganization } from '@services/announcementService';

export default function MyAnnouncements() {
  const user = getUser();
  const orgId = user?.organization_ids?.[0];

  const [orgName, setOrgName] = useState('Organização');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) {
      setLoading(false);
      return;
    }
    getOrganizationById(orgId)
      .then(org => setOrgName(org.name))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [orgId]);

  if (loading || !user || !orgId) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">A carregar anúncios...</p>
      </div>
    );
  }

  return (
    <AnnouncementsManager
      title={`Anúncios da Organização: ${orgName}`}
      fetchAnnouncements={(filters) => fetchAnnouncementsByOrganization(filters)}
      showView={true}
      showEdit={true}
      showDelete={true}
      showStatus={true}
      emptyStateMessage={`Ainda não existem anúncios para ${orgName}.`}
    />
  );
}