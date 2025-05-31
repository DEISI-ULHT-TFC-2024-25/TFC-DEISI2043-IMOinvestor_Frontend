import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useDeleteProperty from "@hooks/useDeleteProperty";
import useDistricts from "@hooks/useDistricts";
import useMunicipalities from "@hooks/useMunicipalities";
import PropertiesSearchBar from "@properties/PropertiesSearchBar";
import PropertiesList from "@properties/PropertiesList";
import PropertiesEmptyState from "@properties/PropertiesEmptyState";
import ConfirmDialog from "@common/ConfirmDialog";
import PropertyDetails from "@properties/PropertyDetails";
import { getPropertyMediasByProperty } from "@services/propertyMediaService";
import PropertyFilters from "@properties/PropertyFilters";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [selectedToView, setSelectedToView] = useState(null);

  // Initialize filters state
  const [filters, setFilters] = useState({
    tipo: "",
    tipologia: "",
    casasBanho: "",
    distrito: "",
    municipio: "",
    novaConstrucao: "",
    certificado: "",
    priceRange: [0, 2000000],
    areaUtilMin: "",
    areaUtilMax: "",
    areaBrutaMin: "",
    areaBrutaMax: "",
    extraInfos: [],
  });

  // Use municipalities hook with the district from filters
  const { municipalities, loadByDistrict } = useMunicipalities(filters.distrito);

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

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleConfirmDelete = async () => {
    if (!selectedToDelete) return;
    const success = await removeProperty(selectedToDelete.id);
    if (success) {
      setProperties((prev) => prev.filter((p) => p.id !== selectedToDelete.id));
      setSuccessMessage("Propriedade apagada com sucesso!");
    } else {
      setSuccessMessage("Erro ao apagar a propriedade.");
    }
    setSelectedToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Debug logging
  console.log("Total properties:", properties.length);
  console.log("Current filters:", filters);
  console.log("Search term:", searchTerm);

  // FILTERING LOGIC
  const filtered = properties.filter((property) => {
    // 1) Search term (by name)
    const matchSearch = searchTerm
      ? property.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // 2) Property type ("tipo")
    //    ← CHANGE HERE: use `property.property_type` instead of `property.tipo`
    const matchType = filters.tipo
      ? property.property_type === filters.tipo
      : true;

    // 3) Tipologia (we expect "T1", "T2", ..., "T9+" exactly)
    const matchTypology = filters.tipologia
      ? property.tipologia === filters.tipologia
      : true;

    // 4) Número de casas de banho
    const propBathCount = parseInt(property.numero_casas_banho, 10) || 0;
    const matchBathrooms = filters.casasBanho
      ? filters.casasBanho === "4+"
        ? propBathCount >= 4
        : propBathCount === parseInt(filters.casasBanho, 10)
      : true;

    // 5) District & Municipality
    const matchDistrict = filters.distrito
      ? String(property.district) === String(filters.distrito)
      : true;
    const matchMunicipality = filters.municipio
      ? String(property.municipality) === String(filters.municipio)
      : true;

    // 6) New construction
    const matchNewConstruction = filters.novaConstrucao
      ? filters.novaConstrucao === "Sim"
        ? property.nova_construcao === true || property.nova_construcao === "Sim"
        : property.nova_construcao === false || property.nova_construcao === "Não" || !property.nova_construcao
      : true;

    // 7) Energy certificate
    const matchCertificate = filters.certificado
      ? property.certificado_energetico === filters.certificado
      : true;

    // 8) Price range
    const [minPrice, maxPrice] = filters.priceRange || [0, 2000000];
    const propertyMinPrice = property.preco_minimo || 0;
    const propertyMaxPrice = property.preco_maximo || propertyMinPrice || 0;
    const matchPriceRange =
      propertyMinPrice <= maxPrice && propertyMaxPrice >= minPrice;

    // 9) Area filters
    const matchAreaUtilMin = filters.areaUtilMin
      ? (property.area_util || 0) >= parseInt(filters.areaUtilMin, 10)
      : true;
    const matchAreaUtilMax = filters.areaUtilMax
      ? (property.area_util || 0) <= parseInt(filters.areaUtilMax, 10)
      : true;
    const matchAreaBrutaMin = filters.areaBrutaMin
      ? (property.area_bruta || 0) >= parseInt(filters.areaBrutaMin, 10)
      : true;
    const matchAreaBrutaMax = filters.areaBrutaMax
      ? (property.area_bruta || 0) <= parseInt(filters.areaBrutaMax, 10)
      : true;

    // 10) Extra infos (comodidades) → use the real key "informacoes_adicionais"
    const propertyExtras = property.informacoes_adicionais || [];
    const matchExtraInfos =
      filters.extraInfos && filters.extraInfos.length > 0
        ? filters.extraInfos.every((info) => {
            return propertyExtras.some(
              (extra) =>
                extra.toLowerCase().includes(info.toLowerCase()) ||
                info.toLowerCase().includes(extra.toLowerCase())
            );
          })
        : true;

    // Debug only the first property
    if (properties.length > 0 && properties.indexOf(property) === 0) {
      console.log("Sample property structure:", property);
      console.log("Filter matches:", {
        matchSearch,
        matchType,
        matchTypology,
        matchBathrooms,
        matchDistrict,
        matchMunicipality,
        matchNewConstruction,
        matchCertificate,
        matchPriceRange,
        matchAreaUtilMin,
        matchAreaUtilMax,
        matchAreaBrutaMin,
        matchAreaBrutaMax,
        matchExtraInfos,
      });
    }

    // Combine all filters
    return (
      matchSearch &&
      matchType &&
      matchTypology &&
      matchBathrooms &&
      matchDistrict &&
      matchMunicipality &&
      matchNewConstruction &&
      matchCertificate &&
      matchPriceRange &&
      matchAreaUtilMin &&
      matchAreaUtilMax &&
      matchAreaBrutaMin &&
      matchAreaBrutaMax &&
      matchExtraInfos
    );
  });

  console.log("Filtered properties:", filtered.length);

  if (loading)
    return <section className="p-6 text-center">A carregar propriedades…</section>;
  if (error)
    return (
      <section className="p-6 text-center text-red-600">
        Erro: {error.message}
      </section>
    );

  return (
    <section className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#0A2647]">
          {title}
        </h1>
        {showEdit && !selectionMode && (
          <button
            onClick={() => navigate("/create-property")}
            className="bg-[#CFAF5E] text-white px-5 py-2 rounded-md hover:bg-[#b89a4e] transition text-sm sm:text-base"
          >
            Nova Propriedade
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <PropertyFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            districts={districts}
            municipalities={municipalities}
            loadMunicipalitiesByDistrict={loadByDistrict}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <PropertiesSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
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
          )}
        </div>
      </div>

      <PropertyDetails
        property={
          selectedToView
            ? {
                ...selectedToView,
                districtName: districts.find(
                  (d) => String(d.id) === String(selectedToView.district)
                )?.name,
                municipalityName: municipalities.find(
                  (m) => String(m.id) === String(selectedToView.municipality)
                )?.name,
              }
            : null
        }
        isOpen={!!selectedToView}
        onClose={() => setSelectedToView(null)}
      />
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