import { useSearchParams } from 'react-router-dom';
import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncements, normalizeFiltersForAnnouncement } from '@services/announcementService';

export default function AllAnnouncements() {
  const [searchParams] = useSearchParams();
  const rawFilters = Object.fromEntries(searchParams.entries());
  const filters = normalizeFiltersForAnnouncement(rawFilters);

  // Create a wrapper function that filters only active announcements
  const fetchActiveAnnouncements = async () => {
    const allAnnouncements = await fetchAnnouncements(filters);
    // Filter to only show active announcements
    return allAnnouncements.filter(announcement => announcement.is_active === true);
  };

  return (
    <AnnouncementsManager
      title=""
      key={searchParams.toString()}
      fetchAnnouncements={fetchActiveAnnouncements}
      initialFilters={filters}
      showView={false}
      showEdit={false}
      showDelete={false}
      showStatus={false} // This hides the status badge
      emptyStateMessage="Ainda não existem anúncios disponíveis."
    />
  );
}