import { useSearchParams } from 'react-router-dom';
import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncements, normalizeFiltersForAnnouncement } from '@services/announcementService';

export default function AllAnnouncements() {
  const [searchParams] = useSearchParams();
  const rawFilters = Object.fromEntries(searchParams.entries());
  const filters = normalizeFiltersForAnnouncement(rawFilters);

  return (
    <AnnouncementsManager
      title=""
      key={searchParams.toString()}
      fetchAnnouncements={() => fetchAnnouncements(filters)}
      initialFilters={filters}
      showView={false}
      showEdit={false}
      showDelete={false}
      emptyStateMessage="Ainda não existem anúncios disponíveis."
    />
  );
}