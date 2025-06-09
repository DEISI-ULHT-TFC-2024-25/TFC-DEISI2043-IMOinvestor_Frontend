import PropTypes from 'prop-types';
import { AnnouncementCard } from '@announcements/AnnouncementCard';
import placeholderImg from '@images/placeholder.jpg';

export default function AnnouncementsList({
  announcements,
  loading = false,
  onDelete,
  onView,
  onEdit,
  showView,
  showEdit,
  selectionMode,
  onSelectAnnouncement,
  selectedAnnouncement,
}) {
  // While loading, show placeholder in place of the grid
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        A carregar anúncios...
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Nenhum anúncio encontrado.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {announcements.map((anun) => (
        <AnnouncementCard
          key={anun.id}
          announcement={anun}
          onView={() => onView && onView(anun)}
          onEdit={() => onEdit && onEdit(anun)}
          showView={showView}
          showEdit={showEdit}
          selectionMode={selectionMode}
          onSelect={() => onSelectAnnouncement && onSelectAnnouncement(anun)}
          isSelected={selectedAnnouncement?.id === anun.id}
          actions={
            !selectionMode && onDelete && (
              <button onClick={() => onDelete(anun)}>🗑</button>
            )
          }
        />
      ))}
    </div>
  );
}

AnnouncementsList.propTypes = {
  announcements: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  selectionMode: PropTypes.bool,
  onSelectAnnouncement: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
};