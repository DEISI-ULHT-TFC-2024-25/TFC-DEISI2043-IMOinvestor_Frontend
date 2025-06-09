import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import AnnouncementsList from '@announcements/AnnouncementsList';
import ConfirmDialog from '@common/ConfirmDialog';
import AnnouncementDetails from '@pages/AnnouncementDetails';
import PropertyFilters from '@properties/PropertyFilters';
import PropertiesSearchBar from '@properties/PropertiesSearchBar';

import useDeleteAnnouncement from '@hooks/useDeleteAnnouncement';
import useDistricts from '@hooks/useDistricts';
import useMunicipalities from '@hooks/useMunicipalities';
import { getPropertyMediasByProperty } from '@services/propertyMediaService';

export default function AnnouncementsManager({
  fetchAnnouncements,
  title,
  showView = true,
  showEdit = true,
  showDelete = true,
  selectionMode = false,
  onAnnouncementSelect = null,
  selectedAnnouncement = null,
}) {
  const navigate = useNavigate();
  const { removeAnnouncement } = useDeleteAnnouncement();
  const { districts } = useDistricts();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [toView, setToView] = useState(null);

  const [filters, setFilters] = useState({
    tipo: '', tipologia: '', casasBanho: '',
    distrito: '', municipio: '', novaConstrucao: '',
    certificado: '', priceRange: [0,2000000],
    areaUtilMin: '', areaUtilMax: '',
    areaBrutaMin: '', areaBrutaMax: '',
    extraInfos: [],
  });

  const { municipalities, loadByDistrict } = useMunicipalities(filters.distrito);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchAnnouncements();
        const withMedia = await Promise.all(
          data.map(async (anun) => {
            const prop = anun.property;
            try {
              const media = await getPropertyMediasByProperty(prop.id);
              return { ...anun, property: { ...prop, media } };
            } catch {
              return { ...anun, property: { ...prop, media: [] } };
            }
          })
        );
        setAnnouncements(withMedia);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fetchAnnouncements]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    const ok = await removeAnnouncement(toDelete.id);
    if (ok) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== toDelete.id));
      setSuccessMessage('Anúncio apagado com sucesso!');
    } else {
      setSuccessMessage('Erro ao apagar anúncio.');
    }
    setToDelete(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // filtering logic omitted for brevity; reuse from ItemsManager
  const filtered = announcements.filter(anun => {
    // e.g. filter by searchTerm and priceRange on anun.price
    return true;
  });

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">A carregar anúncios...</div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-center text-red-600">Erro: {error.message}</div>
    );
  }

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showEdit && !selectionMode && (
          <button
            onClick={() => navigate('/create-announcement')}
            className="px-4 py-2 bg-[#CFAF5E] text-white rounded"
          >
            Novo Anúncio
          </button>
        )}
      </header>

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
              message={`Apagar anúncio de "${toDelete.property.name}"?`}
              onCancel={() => setToDelete(null)}
              onConfirm={confirmDelete}
            />
          )}

          <AnnouncementsList
            announcements={filtered}
            loading={loading}
            onDelete={showDelete && !selectionMode ? setToDelete : undefined}
            onView={showView ? setToView : undefined}
            onEdit={showEdit ? a => navigate(`/edit-announcement/${a.id}`) : undefined}
            showView={showView}
            showEdit={showEdit}
            selectionMode={selectionMode}
            onSelectAnnouncement={onAnnouncementSelect}
            selectedAnnouncement={selectedAnnouncement}
          />

          {toView && (
            <AnnouncementDetails
              announcement={toView}
              isOpen={!!toView}
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
  emptyStateMessage: PropTypes.string,
  selectionMode: PropTypes.bool,
  onAnnouncementSelect: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
};