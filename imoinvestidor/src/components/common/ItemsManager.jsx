import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import PropertiesList from '@properties/PropertiesList';
import AnnouncementsList from '@announcements/AnnouncementsList';
import PropertyFilters from '@properties/PropertyFilters';
import PropertiesSearchBar from '@properties/PropertiesSearchBar';
import PropertiesEmptyState from '@properties/PropertiesEmptyState';
import ConfirmDialog from '@common/ConfirmDialog';
import PropertyDetails from '@properties/PropertyDetails';
import AnnouncementDetails from '@pages/AnnouncementDetails';

import useDeleteProperty from '@hooks/useDeleteProperty';
import useDeleteAnnouncement from '@hooks/useDeleteAnnouncement';
import useDistricts from '@hooks/useDistricts';
import useMunicipalities from '@hooks/useMunicipalities';
import { useItemsData } from '@hooks/useItemsData';

// Memoized components
const MemoizedPropertyFilters = React.memo(PropertyFilters);
const MemoizedPropertiesSearchBar = React.memo(PropertiesSearchBar);
const MemoizedPropertiesList = React.memo(PropertiesList);
const MemoizedAnnouncementsList = React.memo(AnnouncementsList);

// Memoized main content to prevent unnecessary re-renders
const MainContent = React.memo(function MainContent({ 
  listType, 
  allItems, 
  showView, 
  showEdit, 
  showDelete, 
  selectionMode, 
  onItemSelect, 
  selectedItem, 
  emptyStateMessage,
  onDelete,
  onView,
  onEdit,
  filtering
}) {
  const ListComponent = listType === 'property' ? MemoizedPropertiesList : MemoizedAnnouncementsList;
  
  const listProps = listType === 'property'
    ? {
        properties: allItems,
        onDelete: showDelete && !selectionMode ? onDelete : undefined,
        onView: showView ? onView : undefined,
        onEdit: onEdit,
        showView,
        showEdit,
        selectionMode,
        onPropertySelect: onItemSelect,
        selectedProperty: selectedItem,
      }
    : {
        announcements: allItems,
        onDelete: showDelete && !selectionMode ? onDelete : undefined,
        onView: showView ? onView : undefined,
        onEdit: onEdit,
        showView,
        showEdit,
        selectionMode,
        onAnnouncementSelect: onItemSelect,
        selectedAnnouncement: selectedItem,
      };
  
  if (filtering) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center px-4 py-2 bg-[#0A2647]/10 text-[#0A2647] rounded-lg border border-[#CFAF5E]/20">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#CFAF5E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          A filtrar...
        </div>
      </div>
    );
  }
  
  return allItems.length === 0 ? (
    <PropertiesEmptyState message={emptyStateMessage} />
  ) : (
    <ListComponent {...listProps} />
  );
});

export default function ItemsManager({
  listType,
  fetchItems,
  title,
  showView = true,
  showEdit = true,
  showDelete = true,
  emptyStateMessage,
  selectionMode = false,
  onItemSelect = null,
  selectedItem = null,
}) {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [toView, setToView] = useState(null);

  // Use custom hook for data management
  const {
    allItems,
    loading,
    filtering,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    removeItem
  } = useItemsData(fetchItems, listType);

  const { districts } = useDistricts();
  const { municipalities, loadByDistrict } = useMunicipalities(filters.distrito);

  // Delete hooks
  const { removeProperty } = useDeleteProperty();
  const { removeAnnouncement } = useDeleteAnnouncement();

  // Memoized callbacks
  const handleDeleteConfirm = useCallback(async () => {
    if (!toDelete) return;
    
    const ok = listType === 'property'
      ? await removeProperty(toDelete.id)
      : await removeAnnouncement(toDelete.id);

    if (ok) {
      removeItem(toDelete.id);
      setSuccessMessage(
        listType === 'property'
          ? 'Propriedade apagada com sucesso!'
          : 'Anúncio apagado com sucesso!'
      );
    } else {
      setSuccessMessage('Erro ao apagar.');
    }
    setToDelete(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  }, [toDelete, listType, removeProperty, removeAnnouncement, removeItem]);

  const handleCreateNew = useCallback(() => {
    navigate(listType === 'property' ? '/create-property' : '/create-announcement');
  }, [navigate, listType]);

  const handleEdit = useCallback((item) => {
    navigate(listType === 'property' ? `/edit-property/${item.id}` : `/edit-announcement/${item.id}`);
  }, [navigate, listType]);

  // Enhanced view handler with ID validation
  const handleView = useCallback((item) => {
    
    // Validate that item exists and has an ID
    if (!item) {
      return;
    }
    
    if (!item.id) {
      return;
    }
    
    // Additional validation for announcements
    if (listType === 'announcement') {
      if (!item.property) {
        return;
      }
    }
    
    setToView(item);
  }, [listType]);

  const DetailsComponent = listType === 'property' ? PropertyDetails : AnnouncementDetails;

  // Only show initial loading, not filter loading
  if (loading) {
    return (
      <p className="p-6 text-center text-gray-600">
        {listType === 'property' ? 'A carregar propriedades…' : 'A carregar anúncios…'}
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-600">
        Erro: {error.message}
      </p>
    );
  }

  return (
    <section className="p-4 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showEdit && !selectionMode && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-[#CFAF5E] text-white rounded"
          >
            {listType === 'property' ? 'Nova Propriedade' : 'Novo Anúncio'}
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-72">
          <MemoizedPropertyFilters
            filters={filters}
            onFiltersChange={setFilters}
            districts={districts}
            municipalities={municipalities}
            loadMunicipalitiesByDistrict={loadByDistrict}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-4">
          <MemoizedPropertiesSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {successMessage && (
            <div className="p-3 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}

          {toDelete && (
            <ConfirmDialog
              message={`Tem certeza que deseja apagar ${
                listType === 'property' ? toDelete.name : toDelete.property?.title || 'este item'
              }?`}
              onCancel={() => setToDelete(null)}
              onConfirm={handleDeleteConfirm}
            />
          )}

          <MainContent
            listType={listType}
            allItems={allItems}
            showView={showView}
            showEdit={showEdit}
            showDelete={showDelete}
            selectionMode={selectionMode}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem}
            emptyStateMessage={emptyStateMessage}
            onDelete={setToDelete}
            onView={handleView} // Use the enhanced handler
            onEdit={handleEdit}
            filtering={filtering}
          />

          {/* Pass the item directly to the details component */}
          <DetailsComponent
            {...{
              [listType === 'property' ? 'property' : 'announcement']: toView,
              isOpen: !!toView,
              onClose: () => setToView(null),
            }}
          />
        </main>
      </div>
    </section>
  );
}

ItemsManager.propTypes = {
  listType: PropTypes.oneOf(['property', 'announcement']).isRequired,
  fetchItems: PropTypes.func.isRequired,
  title: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  emptyStateMessage: PropTypes.string,
  selectionMode: PropTypes.bool,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};