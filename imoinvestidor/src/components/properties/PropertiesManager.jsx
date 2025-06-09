import PropTypes from 'prop-types';
import ItemsManager from '@common/ItemsManager';

export default function PropertiesManager(props) {
  return (
    <ItemsManager
      listType="property"
      fetchItems={props.fetchProperties}
      {...props}
    />
  );
}

PropertiesManager.propTypes = {
  fetchProperties: PropTypes.func.isRequired,
  title: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  emptyStateMessage: PropTypes.string,
  selectionMode: PropTypes.bool,
  onPropertySelect: PropTypes.func,    // forwarded as onItemSelect internally
  selectedProperty: PropTypes.object,   // forwarded as selectedItem
};