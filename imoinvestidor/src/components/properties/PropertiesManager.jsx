import PropTypes from 'prop-types';
import ItemsManager from '@common/ItemsManager';

export default function PropertiesManager({
  fetchProperties,
  title = "Gestão de Propriedades",
  showView = true,
  showEdit = true,
  showDelete = true,
  emptyStateMessage = "Nenhuma propriedade encontrada",
  selectionMode = false,
  onPropertySelect,
  selectedProperty,
  initialFilters = {},
  ...props
}) {
  return (
    <ItemsManager
      listType="property"
      fetchItems={fetchProperties}
      title={title}
      showView={showView}
      showEdit={showEdit}
      showDelete={showDelete}
      emptyStateMessage={emptyStateMessage}
      selectionMode={selectionMode}
      onItemSelect={onPropertySelect}
      selectedItem={selectedProperty}
      initialFilters={initialFilters}
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
  onPropertySelect: PropTypes.func,
  selectedProperty: PropTypes.object,
  initialFilters: PropTypes.object,
};