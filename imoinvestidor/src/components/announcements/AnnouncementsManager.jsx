import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AnnouncementsList from '@announcements/AnnouncementsList';
import ConfirmDialog from '@common/ConfirmDialog';
import AnnouncementDetails from '@pages/AnnouncementDetails';
import PropertyFilters from '@properties/PropertyFilters';
import PropertiesSearchBar from '@properties/PropertiesSearchBar';
import useDeleteAnnouncement from '@hooks/useDeleteAnnouncement';
import useDistricts from '@hooks/useDistricts';
import useMunicipalities from '@hooks/useMunicipalities';

// Helper function to convert URL filters to PropertyFilters format
const convertToPropertyFiltersFormat = (urlFilters) => {
  return {
    tipo: urlFilters.property_type || '',
    tipologia: urlFilters.tipologia || '',
    casasBanho: urlFilters.numero_casas_banho || '',
    distrito: urlFilters.district || '',
    municipio: urlFilters.municipality || '',
    novaConstrucao: urlFilters.nova_construcao || '',
    certificado: urlFilters.certificado_energetico || '',
    priceRange: [
      parseInt(urlFilters.price_min) || 0,
      parseInt(urlFilters.price_max) || 2000000
    ],
    areaUtilMin: urlFilters.area_util || '',
    areaUtilMax: urlFilters.areaUtilMax || '',
    areaBrutaMin: urlFilters.area_bruta || '',
    areaBrutaMax: urlFilters.areaBrutaMax || '',
    extraInfos: urlFilters.extraInfos || [],
  };
};

export default function AnnouncementsManager({
  fetchAnnouncements,
  title,
  showView = true,
  showEdit = true,
  showDelete = true,
  showStatus = true,
  emptyStateMessage,
  initialFilters = {},
}) {
  const navigate = useNavigate();
  const { removeAnnouncement } = useDeleteAnnouncement();
  const { districts } = useDistricts();

  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [toView, setToView] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Initialize searchTerm from URL filters
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  
  // Initialize filters with URL filters converted to PropertyFilters format
  const [filters, setFilters] = useState(() => {
    const defaultFilters = {
      tipo: '',
      tipologia: '',
      casasBanho: '',
      distrito: '',
      municipio: '',
      novaConstrucao: '',
      certificado: '',
      priceRange: [0, 2000000],
      areaUtilMin: '',
      areaUtilMax: '',
      areaBrutaMin: '',
      areaBrutaMax: '',
      extraInfos: [],
    };
    
    // If we have initial filters from URL, convert and merge them
    if (Object.keys(initialFilters).length > 0) {
      const convertedFilters = convertToPropertyFiltersFormat(initialFilters);
      return { ...defaultFilters, ...convertedFilters };
    }
    
    return defaultFilters;
  });

  const { municipalities, loadByDistrict } = useMunicipalities(filters.distrito);

  useEffect(() => {
    setLoading(true);
    fetchAnnouncements()
      .then((anns) => setAllAnnouncements(anns))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchAnnouncements]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    const ok = await removeAnnouncement(toDelete.id);
    setSuccessMsg(ok ? 'Anúncio apagado com sucesso!' : 'Erro ao apagar anúncio.');
    if (ok) {
      setAllAnnouncements((prev) => prev.filter((a) => a.id !== toDelete.id));
    }
    setToDelete(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filteredAnnouncements = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const [minP, maxP] = filters.priceRange;

    return allAnnouncements.filter((an) => {
      const prop = an.property || {};
      
      // Search term filter
      if (term && !prop.name?.toLowerCase().includes(term)) return false;
      
      // Location filters
      if (filters.distrito && String(prop.district) !== String(filters.distrito)) return false;
      if (filters.municipio && String(prop.municipality) !== String(filters.municipio)) return false;
      
      // Property type filter
      if (filters.tipo && prop.property_type !== filters.tipo) return false;
      
      // Tipologia filter
      if (filters.tipologia && prop.tipologia !== filters.tipologia) return false;
      
      // Bathrooms filter
      if (filters.casasBanho && prop.numero_casas_banho !== filters.casasBanho) return false;
      
      // New construction filter
      if (filters.novaConstrucao && prop.nova_construcao !== filters.novaConstrucao) return false;
      
      // Energy certificate filter
      if (filters.certificado && prop.certificado_energetico !== filters.certificado) return false;
      
      // Area filters
      if (filters.areaUtilMin && parseFloat(prop.area_util || 0) < parseFloat(filters.areaUtilMin)) return false;
      if (filters.areaUtilMax && parseFloat(prop.area_util || 0) > parseFloat(filters.areaUtilMax)) return false;
      if (filters.areaBrutaMin && parseFloat(prop.area_bruta || 0) < parseFloat(filters.areaBrutaMin)) return false;
      if (filters.areaBrutaMax && parseFloat(prop.area_bruta || 0) > parseFloat(filters.areaBrutaMax)) return false;
      
      // Amenities filter
      if (filters.extraInfos && filters.extraInfos.length > 0) {
        const propExtras = prop.extra_infos || [];
        const hasAllExtras = filters.extraInfos.every(extra => propExtras.includes(extra));
        if (!hasAllExtras) return false;
      }

      // Price filter
      const price = parseFloat(an.price || '0');
      return price >= minP && price <= maxP;
    });
  }, [allAnnouncements, searchTerm, filters]);

  if (loading) return <p className="p-6 text-center">A carregar anúncios…</p>;
  if (error) return <p className="p-6 text-center text-red-600">Erro: {error.message}</p>;

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showEdit && (
          <button
            onClick={() => navigate('/create-announcement')}
            className="px-4 py-2 bg-[#CFAF5E] text-white rounded"
          >
            Novo Anúncio
          </button>
        )}
      </header>

      {successMsg && (
        <div className="p-3 mb-4 bg-green-100 text-green-800 rounded">
          {successMsg}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          message={`Apagar anúncio de "${toDelete.property.name}"?`}
          isOpen={true}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

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

          {filteredAnnouncements.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {emptyStateMessage}
            </div>
          ) : (
            <AnnouncementsList
              announcements={filteredAnnouncements}
              onDelete={showDelete ? setToDelete : undefined}
              onView={showView ? setToView : undefined}
              onEdit={(a) => showEdit && navigate(`/edit-announcement/${a.id}`)}
              showView={showView}
              showEdit={showEdit}
              showStatus={showStatus}
            />
          )}

          {toView && (
            <AnnouncementDetails
              announcement={toView}
              isOpen={true}
              onClose={() => setToView(null)}
            />
          )}
        </main>
      </div>
    </section>
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
  initialFilters: PropTypes.object,
};