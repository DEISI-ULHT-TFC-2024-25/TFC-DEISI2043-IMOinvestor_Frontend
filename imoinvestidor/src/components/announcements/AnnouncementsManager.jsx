import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AnnouncementsList from '@announcements/AnnouncementsList';
import ConfirmDialog from '@common/ConfirmDialog';
import AnnouncementDetails from '@pages/AnnouncementDetails';
import PropertyFilters from '@properties/PropertyFilters';
import PropertiesSearchBar from '@properties/PropertiesSearchBar';
import { getPropertyMediasByProperty } from '@services/propertyMediaService';
import useDeleteAnnouncement from '@hooks/useDeleteAnnouncement';
import useDistricts from '@hooks/useDistricts';
import useMunicipalities from '@hooks/useMunicipalities';

export default function AnnouncementsManager({
  fetchAnnouncements,
  title,
  showView = true,
  showEdit = true,
  showDelete = true,
  emptyStateMessage,
}) {
  const navigate = useNavigate();
  const { removeAnnouncement } = useDeleteAnnouncement();
  const { districts } = useDistricts();

  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [toDelete, setToDelete]           = useState(null);
  const [toView, setToView]               = useState(null);
  const [successMsg, setSuccessMsg]       = useState('');
  const [searchTerm, setSearchTerm]       = useState('');
  const [filters, setFilters]             = useState({
    district:      '',
    municipality:  '',
    priceRange:    [0, 2000000],
    property_type: '',
  });

  const { municipalities, loadByDistrict } = useMunicipalities(filters.district);

  // 1) fetch announcements[] (already expanded property)
  // 2) attach media[] to each property
  useEffect(() => {
    setLoading(true);
    fetchAnnouncements()
      .then(async (anns) => {
        const withMedia = await Promise.all(
          anns.map(async (an) => {
            const media = await getPropertyMediasByProperty(an.property.id).catch(() => []);
            return {
              ...an,
              property: {
                ...an.property,
                media,
              },
            };
          })
        );
        setAllAnnouncements(withMedia);
      })
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
      if (term && !prop.name.toLowerCase().includes(term)) return false;
      if (filters.district && String(prop.district) !== String(filters.district)) return false;
      if (filters.municipality && String(prop.municipality) !== String(filters.municipality)) return false;
      if (filters.property_type && prop.property_type !== filters.property_type) return false;

      const price = parseFloat(an.price || '0');
      if (price < minP || price > maxP) return false;

      return true;
    });
  }, [allAnnouncements, searchTerm, filters]);

  if (loading) return <p className="p-6 text-center">A carregar anúncios…</p>;
  if (error)   return <p className="p-6 text-center text-red-600">Erro: {error.message}</p>;

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
  title:              PropTypes.string,
  showView:           PropTypes.bool,
  showEdit:           PropTypes.bool,
  showDelete:         PropTypes.bool,
  emptyStateMessage:  PropTypes.string,
};