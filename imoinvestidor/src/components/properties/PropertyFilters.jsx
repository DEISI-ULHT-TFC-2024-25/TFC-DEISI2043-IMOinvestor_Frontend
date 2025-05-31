import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Filter, X, ChevronDown } from "lucide-react";
import SelectField from "@common/SelectField";
import PriceRangeSlider from "@common/PriceRangeSlider";
import CheckboxGroup from "@common/CheckboxGroup";
import { handleDistrictChange } from "@utils/locationUtils";

const extraInfos = [
  "varanda",
  "duplex",
  "piscina",
  "elevador",
  "garagem",
  "terraço",
  "jardim",
  "acessibilidade para pessoas com mobilidade reduzida",
];

const PropertyFilters = ({
  filters,
  onFiltersChange,
  districts = [],
  municipalities = [],
  loadMunicipalitiesByDistrict, // Function to reload municipalities when district changes
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (name, value) => {
    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };

  const handleCheckboxChange = (info) => {
    const currentExtras = filters.extraInfos || [];
    const newExtras = currentExtras.includes(info)
      ? currentExtras.filter((item) => item !== info)
      : [...currentExtras, info];

    handleFilterChange("extraInfos", newExtras);
  };

  // Handle district change: reset municipality if district changes
  const handleDistrictFilterChange = async (e) => {
    const newDistrict = e.target.value;

    await handleDistrictChange({
      newDistrict: String(newDistrict),
      currentMunicipality: filters.municipio || "",
      loadByDistrict: loadMunicipalitiesByDistrict,
      setDistrict: (district) => handleFilterChange("distrito", district),
      setMunicipality: (municipality) =>
        handleFilterChange("municipio", municipality),
    });
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const hasActiveFilters = () => {
    return (
      filters.tipo ||
      filters.tipologia ||
      filters.casasBanho ||
      filters.distrito ||
      filters.municipio ||
      filters.novaConstrucao ||
      filters.certificado ||
      filters.priceRange?.[0] > 0 ||
      filters.priceRange?.[1] < 2000000 ||
      filters.areaUtilMin ||
      filters.areaUtilMax ||
      filters.areaBrutaMin ||
      filters.areaBrutaMax ||
      (filters.extraInfos && filters.extraInfos.length > 0)
    );
  };

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Property Type and Tipologia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Tipo de Imóvel"
          name="tipo"
          value={filters.tipo || ""}
          onChange={(e) => handleFilterChange("tipo", e.target.value)}
          options={[
            { label: "Apartamento", value: "Apartamento" },
            { label: "Casa", value: "Casa" },
          ]}
          placeholder="Todos os tipos"
        />

        <SelectField
          label="Tipologia"
          name="tipologia"
          value={filters.tipologia || ""}
          onChange={(e) => handleFilterChange("tipologia", e.target.value)}
          options={[...Array(10)].map((_, i) => ({
            label: i < 9 ? `T${i}` : "T9+",
            value: i < 9 ? `T${i}` : "T9+",
          }))}
          placeholder="Todas as tipologias"
        />
      </div>

      {/* Bathrooms and New Construction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Nº Casas de Banho"
          name="casasBanho"
          value={filters.casasBanho || ""}
          onChange={(e) => handleFilterChange("casasBanho", e.target.value)}
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4+", value: "4+" },
          ]}
          placeholder="Qualquer quantidade"
        />

        <SelectField
          label="Nova Construção"
          name="novaConstrucao"
          value={filters.novaConstrucao || ""}
          onChange={(e) =>
            handleFilterChange("novaConstrucao", e.target.value)
          }
          options={[
            { label: "Sim", value: "Sim" },
            { label: "Não", value: "Não" },
          ]}
          placeholder="Indiferente"
        />
      </div>

      {/* Location: Distrito & Município */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Distrito"
          name="distrito"
          value={String(filters.distrito || "")}
          onChange={handleDistrictFilterChange}
          options={districts.map((d) => ({
            label: d.name,
            value: String(d.id),
          }))}
          placeholder="Todos os distritos"
        />

        <SelectField
          label="Município"
          name="municipio"
          value={String(filters.municipio || "")}
          onChange={(e) =>
            handleFilterChange("municipio", String(e.target.value))
          }
          options={municipalities.map((m) => ({
            label: m.name,
            value: String(m.id),
          }))}
          placeholder="Todos os municípios"
        />
      </div>

      {/* Energy Certificate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Certificado Energético"
          name="certificado"
          value={filters.certificado || ""}
          onChange={(e) => handleFilterChange("certificado", e.target.value)}
          options={[
            { label: "A+", value: "A+" },
            { label: "A", value: "A" },
            { label: "B", value: "B" },
            { label: "B-", value: "B-" },
            { label: "C", value: "C" },
            { label: "D", value: "D" },
            { label: "E", value: "E" },
            { label: "F", value: "F" },
          ]}
          placeholder="Qualquer certificação"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Intervalo de Preço
        </label>
        <PriceRangeSlider
          priceRange={filters.priceRange || [0, 2000000]}
          setPriceRange={(range) => handleFilterChange("priceRange", range)}
        />
      </div>

      {/* Área Útil */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Área Útil (m²)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Mín."
              value={filters.areaUtilMin || ""}
              onChange={(e) =>
                handleFilterChange("areaUtilMin", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Máx."
              value={filters.areaUtilMax || ""}
              onChange={(e) =>
                handleFilterChange("areaUtilMax", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Área Bruta */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Área Bruta (m²)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Mín."
              value={filters.areaBrutaMin || ""}
              onChange={(e) =>
                handleFilterChange("areaBrutaMin", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Máx."
              value={filters.areaBrutaMax || ""}
              onChange={(e) =>
                handleFilterChange("areaBrutaMax", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Extra Infos / Comodidades */}
      <div className="space-y-2">
        <CheckboxGroup
          label="Comodidades"
          options={extraInfos}
          selectedOptions={filters.extraInfos || []}
          onChange={handleCheckboxChange}
        />
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters() && (
        <div className="pt-4 border-t">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );

  if (!isMobile) {
    // Desktop: Always visible filter panel
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0A2647] flex items-center">
            <Filter size={20} className="mr-2" />
            Filtros
          </h3>
          {hasActiveFilters() && (
            <span className="text-xs bg-[#CFAF5E] text-white px-2 py-1 rounded-full">
              Ativos
            </span>
          )}
        </div>
        <FilterContent />
      </div>
    );
  }

  // Mobile: Collapsible
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors ${
          hasActiveFilters()
            ? "bg-[#CFAF5E] text-white border-[#CFAF5E]"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2" />
          <span className="font-medium">Filtros</span>
          {hasActiveFilters() && (
            <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              Ativos
            </span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Filter Panel */}
          <div className="fixed inset-x-4 top-20 bottom-20 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-[#0A2647]">
                Filtrar Propriedades
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterContent />
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition-colors font-medium"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

PropertyFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  districts: PropTypes.array,
  municipalities: PropTypes.array,
  loadMunicipalitiesByDistrict: PropTypes.func.isRequired,
};

export default PropertyFilters;
