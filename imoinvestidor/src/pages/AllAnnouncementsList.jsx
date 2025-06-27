import { useSearchParams, useNavigate } from 'react-router-dom';
import AnnouncementsManager from '@announcements/AnnouncementsManager';
import { fetchAnnouncements, normalizeFiltersForAnnouncement } from '@services/announcementService';
import { useAuth } from '@/contexts/AuthContext';

export default function AllAnnouncements() {
  const { isAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawFilters = Object.fromEntries(searchParams.entries());
  const filters = normalizeFiltersForAnnouncement(rawFilters);

  // Create a wrapper function that filters only active announcements
  const fetchActiveAnnouncements = async () => {
    const allAnnouncements = await fetchAnnouncements(filters);
    // Filter to only show active announcements
    return allAnnouncements.filter(announcement => announcement.is_active === true);
  };

  // Handle view announcement - navigate to individual announcement page
  const handleViewAnnouncement = (announcement) => {
    navigate(`/announcement/${announcement.id}`);
  };

  return (
    <AnnouncementsManager
      title=""
      key={searchParams.toString()}
      fetchAnnouncements={fetchActiveAnnouncements}
      initialFilters={filters}
      showView={false}
      showEdit={isAdmin}
      showDelete={isAdmin}
      showStatus={false}
      emptyStateMessage="Ainda não existem anúncios disponíveis."
      onAnnouncementSelect={handleViewAnnouncement}
      viewStyle="button"
    />
  );
}