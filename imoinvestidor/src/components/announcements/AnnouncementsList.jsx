import PropTypes from 'prop-types';
import { AnnouncementCard } from '@announcements/AnnouncementCard';
import { Trash2 } from 'lucide-react';

export default function AnnouncementsList({
  announcements,
  loading = false,
  onDelete,
  onView,
  onEdit,
  showView,
  showEdit,
  showStatus = true,
  selectionMode,
  onSelectAnnouncement,
  selectedAnnouncement,
}) {
  if (loading) {
    return <div className="p-6 text-center text-gray-600">A carregar anúncios...</div>;
  }

  if (!announcements?.length) {
    return <div className="p-6 text-center text-gray-500">Nenhum anúncio encontrado.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {announcements.map((anun) => (
        <AnnouncementCard
          key={anun.id}
          announcement={anun}
          showView={showView}
          showEdit={showEdit}
          showStatus={showStatus}
          onView={() => onView?.(anun)}
          onEdit={() => onEdit?.(anun)}
          selectionMode={selectionMode}
          onSelect={() => onSelectAnnouncement?.(anun)}
          isSelected={selectedAnnouncement?.id === anun.id}
          actions={
            !selectionMode && onDelete && (
              <button
                onClick={() => onDelete(anun)}
                title="Eliminar anúncio"
                className="p-1 rounded-full bg-white bg-opacity-75 hover:bg-red-100 transition"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            )
          }
        />
      ))}
    </div>
  );
}

AnnouncementsList.propTypes = {
  announcements:        PropTypes.array,
  loading:              PropTypes.bool,
  onDelete:             PropTypes.func,
  onView:               PropTypes.func,
  onEdit:               PropTypes.func,
  showView:             PropTypes.bool,
  showEdit:             PropTypes.bool,
  showStatus:           PropTypes.bool,
  selectionMode:        PropTypes.bool,
  onSelectAnnouncement: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
};