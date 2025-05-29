import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useDeleteProperty from "@hooks/useDeleteProperty";
import useDistricts from "@hooks/useDistricts";
import useMunicipalities from "@hooks/useMunicipalities";
import { handleDistrictChange } from "@utils/locationUtils";
import PropertiesSearchBar from "@properties/PropertiesSearchBar";
import PropertiesList from "@properties/PropertiesList";
import PropertiesEmptyState from "@properties/PropertiesEmptyState";
import ConfirmDialog from "@common/ConfirmDialog";
import SelectField from "@common/SelectField";
import PropertyDetails from "@properties/PropertyDetails";
import { getPropertyMediasByProperty } from "@services/propertyMediaService";

export default function PropertiesManager({
  fetchProperties,
  title,
  showView = true,
  showEdit = true,
  showDelete = true,
  emptyStateMessage = "Nenhuma propriedade encontrada.",
  selectionMode = false,
  onPropertySelect = null,
  selectedProperty = null,
}) {
  const navigate = useNavigate();
  const { removeProperty } = useDeleteProperty();
  const { districts } = useDistricts();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const { municipalities, loadByDistrict } = useMunicipalities(selectedDistrict);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [selectedToView, setSelectedToView] = useState(null);

  useEffect(() => {
    const loadPropertiesWithMedia = async () => {
      try {
        const rawProperties = await fetchProperties();

        const propertiesWithMedia = await Promise.all(
          rawProperties.map(async (prop) => {
            try {
              const media = await getPropertyMediasByProperty(prop.id);
              return { ...prop, media };
            } catch (err) {
              console.warn(`Erro ao carregar media de propriedade ${prop.id}:`, err);
              return { ...prop, media: [] };
            }
          })
        );

        setProperties(propertiesWithMedia);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPropertiesWithMedia();
  }, [fetchProperties]);

  const handleConfirmDelete = async () => {
    if (!selectedToDelete) return;
    const success = await removeProperty(selectedToDelete.id);
    if (success) {
      setProperties(prev => prev.filter(p => p.id !== selectedToDelete.id));
      setSuccessMessage("Propriedade apagada com sucesso!");
    } else {
      setSuccessMessage("Erro ao apagar a propriedade.");
    }
    setSelectedToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filtered = properties.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = selectedDistrict ? String(p.district) === selectedDistrict : true;
    const matchMunicipality = selectedMunicipality ? String(p.municipality) === selectedMunicipality : true;
    return matchSearch && matchDistrict && matchMunicipality;
  });

  if (loading) return <section className="p-6 text-center">A carregar propriedades…</section>;
  if (error) return <section className="p-6 text-center text-red-600">Erro: {error.message}</section>;

  return (
    <section className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#0A2647]">{title}</h1>
        {showEdit && !selectionMode && (
          <button
            onClick={() => navigate("/create-property")}
            className="bg-[#CFAF5E] text-white px-5 py-2 rounded-md hover:bg-[#b89a4e] transition text-sm sm:text-base"
          >
            Nova Propriedade
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <PropertiesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SelectField
          name="distrito"
          value={String(selectedDistrict)}
          onChange={async e => {
            await handleDistrictChange({
              newDistrict: String(e.target.value),
              currentMunicipality: selectedMunicipality,
              loadByDistrict,
              setDistrict: setSelectedDistrict,
              setMunicipality: setSelectedMunicipality
            });
          }}
          options={districts.map(d => ({ label: d.name, value: String(d.id) }))}
          placeholder="Distrito"
        />

        <SelectField
          name="municipio"
          value={String(selectedMunicipality)}
          onChange={e => setSelectedMunicipality(String(e.target.value))}
          options={municipalities.map(m => ({ label: m.name, value: String(m.id) }))}
          placeholder="Município"
        />
      </div>

      {successMessage && (
        <div className="text-green-600 bg-green-100 border border-green-300 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {selectedToDelete && (
        <ConfirmDialog
          message={`Tem a certeza que quer apagar "${selectedToDelete.name}"?`}
          onCancel={() => setSelectedToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {filtered.length === 0 ? (
        <PropertiesEmptyState message={emptyStateMessage} />
      ) : (
        <>
          <PropertiesList
            properties={filtered}
            onDelete={showDelete && !selectionMode ? setSelectedToDelete : undefined}
            onView={showView ? setSelectedToView : undefined}
            showView={showView}
            showEdit={showEdit}
            selectionMode={selectionMode}
            onPropertySelect={onPropertySelect}
            selectedProperty={selectedProperty}
          />

          <PropertyDetails
            property={
              selectedToView
                ? {
                    ...selectedToView,
                    districtName: districts.find(d => String(d.id) === String(selectedToView.district))?.name,
                    municipalityName: municipalities.find(m => String(m.id) === String(selectedToView.municipality))?.name,
                  }
                : null
            }
            isOpen={!!selectedToView}
            onClose={() => setSelectedToView(null)}
          />
        </>
      )}
    </section>
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
};