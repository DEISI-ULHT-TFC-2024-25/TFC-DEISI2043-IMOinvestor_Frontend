import PropTypes from 'prop-types';
import ItemsManager from '@common/ItemsManager';

export default function AnnouncementsManager({
  fetchAnnouncements,
  title = "Gestão de Anúncios",
  showView = true,
  showEdit = true,
  showDelete = true,
  showStatus = true,
  emptyStateMessage = "Nenhum anúncio encontrado",
  selectionMode = false,
  onAnnouncementSelect,
  selectedAnnouncement,
  initialFilters = {},
  viewStyle = "icon",
  ...props
}) {
  return (
    <ItemsManager
      listType="announcement"
      fetchItems={fetchAnnouncements}
      title={title}
      showView={showView}
      showEdit={showEdit}
      showDelete={showDelete}
      showStatus={showStatus}
      emptyStateMessage={emptyStateMessage}
      selectionMode={selectionMode}
      onItemSelect={onAnnouncementSelect}
      selectedItem={selectedAnnouncement}
      initialFilters={initialFilters}
      viewStyle={viewStyle}
      {...props}
    />
  );
}

AnnouncementsManager.propTypes = {
  fetchAnnouncements: PropTypes.func.isRequired,
  title: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showStatus: PropTypes.bool,
  emptyStateMessage: PropTypes.string,
  selectionMode: PropTypes.bool,
  onAnnouncementSelect: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
  initialFilters: PropTypes.object,
  viewStyle: PropTypes.oneOf(['icon', 'button']),
};