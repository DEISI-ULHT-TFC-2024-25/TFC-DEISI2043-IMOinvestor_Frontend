import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import PropertiesList from '@properties/PropertiesList';
import AnnouncementsList from '@announcements/AnnouncementsList';
import PropertyFilters from '@properties/PropertyFilters';
import PropertiesSearchBar from '@properties/PropertiesSearchBar';
import PropertiesEmptyState from '@properties/PropertiesEmptyState';
import ConfirmDialog from '@common/ConfirmDialog';
import PropertyDetails from '@properties/PropertyDetails';
import AnnouncementDetails from '@pages/AnnouncementDetails';

import { getPropertyMediasByProperty } from '@services/propertyMediaService';
import useDeleteProperty from '@hooks/useDeleteProperty';
import useDeleteAnnouncement from '@hooks/useDeleteAnnouncement';
import useDistricts from '@hooks/useDistricts';
import useMunicipalities from '@hooks/useMunicipalities';

export default function ItemsManager({
  listType,           // 'property' or 'announcement'
  fetchItems,         // fetchProperties or fetchAnnouncements
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
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [toView, setToView] = useState(null);

  const [filters, setFilters] = useState({
    tipo: '', 
    tipologia: '',
    casasBanho: '',
    distrito: '', 
    municipio: '', 
    novaConstrucao: '',
    certificado: '',
    priceRange: [0,2000000],
    areaUtilMin: '', 
    areaUtilMax: '',
    areaBrutaMin: '', 
    areaBrutaMax: '',
    extraInfos: [],
  });

  const { districts } = useDistricts();
  const { municipalities, loadByDistrict } = useMunicipalities(filters.distrito);

  // Convert filters to API parameters
  const getApiParams = () => {
    const params = {};
    
    // Add search term
    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }
    
    // Add filters
    if (filters.distrito) params.district = filters.distrito;
    if (filters.municipio) params.municipality = filters.municipio;
    if (filters.tipo) params.property_type = filters.tipo;
    if (filters.tipologia) params.tipologia = filters.tipologia;
    if (filters.casasBanho) params.numero_casas_banho = filters.casasBanho;
    if (filters.novaConstrucao) params.nova_construcao = filters.novaConstrucao;
    if (filters.certificado) params.certificado_energetico = filters.certificado;
    
    // Price range
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (minPrice > 0) params.price_min = minPrice;
      if (maxPrice < 2000000) params.price_max = maxPrice;
    }
    
    // Area filters
    if (filters.areaUtilMin) params.area_util_min = filters.areaUtilMin;
    if (filters.areaUtilMax) params.area_util_max = filters.areaUtilMax;
    if (filters.areaBrutaMin) params.area_bruta_min = filters.areaBrutaMin;
    if (filters.areaBrutaMax) params.area_bruta_max = filters.areaBrutaMax;
    
    // Extra infos
    if (filters.extraInfos && filters.extraInfos.length > 0) {
      params.extra_infos = filters.extraInfos.join(',');
    }
    
    return params;
  };

  // Load items with current filters and search term
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        // Get API parameters based on current filters and search
        const apiParams = getApiParams();
        
        // Fetch filtered items from server
        const data = await fetchItems(apiParams);
        
        // Add media to each item
        const withMedia = await Promise.all(data.map(async item => {
          const prop = listType === 'property' ? item : item.property;
          try {
            const media = await getPropertyMediasByProperty(prop.id);
            return listType === 'property'
              ? { ...item, media }
              : { ...item, property: { ...prop, media } };
          } catch {
            return listType === 'property'
              ? { ...item, media: [] }
              : { ...item, property: { ...prop, media: [] } };
          }
        }));
        
        setAllItems(withMedia);
      } catch (e) {
        setError(e);
        setAllItems([]);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [fetchItems, listType, filters, searchTerm]); // Re-fetch when filters or search changes

  // Delete hooks
  const { removeProperty } = useDeleteProperty();
  const { removeAnnouncement } = useDeleteAnnouncement();

  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    const ok = listType === 'property'
      ? await removeProperty(toDelete.id)
      : await removeAnnouncement(toDelete.id);

    if (ok) {
      setAllItems(prev => prev.filter(i => i.id !== toDelete.id));
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
  };

  const ListComponent = listType === 'property' ? PropertiesList : AnnouncementsList;

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
            onClick={() => navigate(listType === 'property' ? '/create-property' : '/create-announcement')}
            className="px-4 py-2 bg-[#CFAF5E] text-white rounded"
          >
            {listType === 'property' ? 'Nova Propriedade' : 'Novo Anúncio'}
          </button>
        )}
      </div>

      <div className="flex gap-6">
        <aside className="w-72">
          <PropertyFilters
            filters={filters}
            onFiltersChange={setFilters}
            districts={districts}
            municipalities={municipalities}
            loadMunicipalitiesByDistrict={loadByDistrict}
          />
        </aside>

        <main className="flex-1 space-y-4">
          <PropertiesSearchBar
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
                listType === 'property' ? toDelete.name : toDelete.property.title
              }?`}
              onCancel={() => setToDelete(null)}
              onConfirm={handleDeleteConfirm}
            />
          )}

          {allItems.length === 0 ? (
            <PropertiesEmptyState message={emptyStateMessage} />
          ) : (
            <ListComponent
              {...(
                listType === 'property'
                  ? {
                      properties: allItems,
                      onDelete: showDelete && !selectionMode ? setToDelete : undefined,
                      onView: showView ? setToView : undefined,
                      onEdit: p => navigate(`/edit-property/${p.id}`),
                      showView,
                      showEdit,
                      selectionMode,
                      onPropertySelect: onItemSelect,
                      selectedProperty: selectedItem,
                    }
                  : {
                      announcements: allItems,
                      onDelete: showDelete && !selectionMode ? setToDelete : undefined,
                      onView: showView ? setToView : undefined,
                      onEdit: a => navigate(`/edit-announcement/${a.id}`),
                      showView,
                      showEdit,
                      selectionMode,
                      onAnnouncementSelect: onItemSelect,
                      selectedAnnouncement: selectedItem,
                    }
              )}
            />
          )}

          {listType === 'property' ? (
            <PropertyDetails
              property={toView || null}
              isOpen={!!toView}
              onClose={() => setToView(null)}
            />
          ) : (
            <AnnouncementDetails
              announcement={toView || null}
              isOpen={!!toView}
              onClose={() => setToView(null)}
            />
          )}
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