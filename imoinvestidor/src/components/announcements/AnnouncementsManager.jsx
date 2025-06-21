import PropTypes from 'prop-types';
import ItemsManager from '@common/ItemsManager';

export default function AnnouncementsManager(props) {
  return (
    <ItemsManager
      listType="announcement"
      fetchItems={props.fetchAnnouncements}
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
  emptyStateMessage: PropTypes.string,
  selectionMode: PropTypes.bool,
  onAnnouncementSelect: PropTypes.func,    // forwarded as onItemSelect internally
  selectedAnnouncement: PropTypes.object,   // forwarded as selectedItem
  initialFilters: PropTypes.object,
};