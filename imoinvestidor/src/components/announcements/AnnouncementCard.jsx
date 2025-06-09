import PropTypes from 'prop-types';
import { AnnouncementCard } from '@announcements/AnnouncementCard';

export default function AnnouncementsList({
  announcements,
  onDelete,
  onView,
  onEdit,
  showView,
  showEdit,
  selectionMode,
  onSelectAnnouncement,
  selectedAnnouncement,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {announcements.map((anun) => (
        <AnnouncementCard
          key={anun.id}
          announcement={anun}
          onView={() => onView(anun)}
          onEdit={() => onEdit(anun)}
          actions={onDelete ? <button onClick={() => onDelete(anun)}>🗑</button> : null}
          selectionMode={selectionMode}
          onSelect={() => onSelectAnnouncement(anun)}
          isSelected={selectedAnnouncement?.id === anun.id}
          showView={showView}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
}

AnnouncementsList.propTypes = {
  announcements: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  selectionMode: PropTypes.bool,
  onSelectAnnouncement: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
};
