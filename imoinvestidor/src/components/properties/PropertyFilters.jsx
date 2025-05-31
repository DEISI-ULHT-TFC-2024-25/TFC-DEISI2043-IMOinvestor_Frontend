import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Filter, ChevronDown } from "lucide-react";
import Modal from "@common/Modal";
import SelectField from "@common/SelectField";
import InputField from "@common/InputField";
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
  loadMunicipalitiesByDistrict,
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

  const getActiveFiltersCount = () => {
    let count = 0;
    
    if (filters.tipo) count++;
    if (filters.tipologia) count++;
    if (filters.casasBanho) count++;
    if (filters.distrito) count++;
    if (filters.municipio) count++;
    if (filters.novaConstrucao) count++;
    if (filters.certificado) count++;
    if (filters.priceRange?.[0] > 0 || filters.priceRange?.[1] < 2000000) count++;
    if (filters.areaUtilMin) count++;
    if (filters.areaUtilMax) count++;
    if (filters.areaBrutaMin) count++;
    if (filters.areaBrutaMax) count++;
    if (filters.extraInfos && filters.extraInfos.length > 0) count++;
    
    return count;
  };

  const hasActiveFilters = () => getActiveFiltersCount() > 0;

  const FilterContent = () => (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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
        <div></div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Intervalo de Preço
        </label>
        <PriceRangeSlider
          priceRange={filters.priceRange || [0, 2000000]}
          setPriceRange={(range) => handleFilterChange("priceRange", range)}
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Área Útil (m²)</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="areaUtilMin"
            type="number"
            value={filters.areaUtilMin || ""}
            onChange={(e) => handleFilterChange("areaUtilMin", e.target.value)}
            placeholder="Mín."
            inputClassName="focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            preventNegative={true}
          />
          <InputField
            name="areaUtilMax"
            type="number"
            value={filters.areaUtilMax || ""}
            onChange={(e) => handleFilterChange("areaUtilMax", e.target.value)}
            placeholder="Máx."
            inputClassName="focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            preventNegative={true}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Área Bruta (m²)</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="areaBrutaMin"
            type="number"
            value={filters.areaBrutaMin || ""}
            onChange={(e) => {
              const value = Math.max(0, parseFloat(e.target.value) || 0);
              handleFilterChange("areaBrutaMin", value.toString());
            }}
            placeholder="Mín."
            inputClassName="focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            min="0"
          />
          <InputField
            name="areaBrutaMax"
            type="number"
            value={filters.areaBrutaMax || ""}
            onChange={(e) => {
              const value = Math.max(0, parseFloat(e.target.value) || 0);
              handleFilterChange("areaBrutaMax", value.toString());
            }}
            placeholder="Máx."
            inputClassName="focus:ring-2 focus:ring-[#CFAF5E] focus:border-transparent"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-3">
        <CheckboxGroup
          label="Comodidades"
          options={extraInfos}
          selectedOptions={filters.extraInfos || []}
          onChange={handleCheckboxChange}
        />
      </div>

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
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0A2647] flex items-center">
            <Filter size={20} className="mr-2" />
            Filtros
          </h3>
          {hasActiveFilters() && (
            <span className="text-xs bg-[#CFAF5E] text-white px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <FilterContent />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
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
            <span className={`ml-2 text-xs px-2 py-1 rounded-full font-medium ${
              hasActiveFilters() 
                ? "bg-white text-[#CFAF5E]" 
                : "bg-white bg-opacity-20"
            }`}>
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <ChevronDown size={18} />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filtrar Propriedades"
        size="fullscreen-mobile"
      >
        <FilterContent />
        
        <div className="p-3 border-t bg-gray-50 flex-shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 bg-[#CFAF5E] text-white rounded-md hover:bg-[#b89a4e] transition-colors font-medium text-sm"
          >
            Aplicar Filtros
          </button>
        </div>
      </Modal>
    </>
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