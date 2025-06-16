import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncements } from '@services/announcementService';

export default function AllAnnouncements() {
  return (
    <AnnouncementsManager
      title=""
      fetchAnnouncements={(filters) => fetchAnnouncements(filters)}
      showView={false}
      showEdit={false}
      showDelete={false}
      emptyStateMessage="Ainda não existem anúncios disponíveis."
    />
  );
}