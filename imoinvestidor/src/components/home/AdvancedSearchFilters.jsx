import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import SelectField from "@common/SelectField";
import InputField from "@common/InputField";
import PriceRangeSlider from "@common/PriceRangeSlider";
import CheckboxGroup from "@common/CheckboxGroup";
import useDistricts from "@hooks/useDistricts";
import useMunicipalities from "@hooks/useMunicipalities";
import { handleDistrictChange } from "@utils/locationUtils";

export default function AdvancedSearchFilters({
  filters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
}) {
  const [activeTab, setActiveTab] = useState("basic");

  // Location hooks
  const { districts } = useDistricts();
  const { municipalities, loadByDistrict, setMunicipalities } = useMunicipalities();

  useEffect(() => {
    // Load all municipalities on component mount
    loadByDistrict(null).then(setMunicipalities).catch(console.error);
  }, [loadByDistrict, setMunicipalities]);

  const handleFilterUpdate = (name, value) => {
    onFilterChange(name, value);
  };

  const handleDistrictFilterChange = async (e) => {
    const newDistrict = e.target.value;

    await handleDistrictChange({
      newDistrict: String(newDistrict),
      currentMunicipality: filters.municipality || "",
      loadByDistrict,
      setDistrict: (district) => handleFilterUpdate("district", district),
      setMunicipality: (municipality) => handleFilterUpdate("municipality", municipality),
      setMunicipalities,
    });
  };

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

  const handleCheckboxChange = (info) => {
    const currentExtras = filters.extraInfos || [];
    const newExtras = currentExtras.includes(info)
      ? currentExtras.filter((item) => item !== info)
      : [...currentExtras, info];

    handleFilterUpdate("extraInfos", newExtras);
  };

  return (
    <div className="mt-4 border-t pt-6 space-y-6 text-left text-sm text-[#0A2647]">
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "basic"
              ? "border-[#CFAF5E] text-[#CFAF5E]"
              : "border-transparent text-gray-500 hover:text-[#0A2647]"
          }`}
        >
          Filtros Básicos
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("advanced")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "advanced"
              ? "border-[#CFAF5E] text-[#CFAF5E]"
              : "border-transparent text-gray-500 hover:text-[#0A2647]"
          }`}
        >
          Filtros Avançados
        </button>
      </div>

      {activeTab === "basic" ? (
        <div className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Tipo de Imóvel"
              name="property_type"
              value={filters.property_type ?? ""}
              onChange={(e) => handleFilterUpdate("property_type", e.target.value)}
              options={[
                { label: "Apartamento", value: "Apartamento" },
                { label: "Casa", value: "Casa" },
              ]}
              placeholder="Tipo"
            />
            <SelectField
              label="Tipologia"
              name="tipologia"
              value={filters.tipologia || ""}
              onChange={(e) => handleFilterUpdate("tipologia", e.target.value)}
              options={Array.from({ length: 10 }, (_, i) => ({
                label: i < 9 ? `T${i}` : "T9+",
                value: i < 9 ? `T${i}` : "T9+",
              }))}
              placeholder="Tipologia"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Casas de Banho"
              name="numero_casas_banho"
              value={filters.numero_casas_banho ?? ""}
              onChange={(e) => handleFilterUpdate("numero_casas_banho", e.target.value)}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5+", value: "5" },
              ]}
              placeholder="Nº Casas de Banho"
            />
            <SelectField
              label="Nova Construção"
              name="nova_construcao"
              value={filters.nova_construcao ?? ""}
              onChange={(e) => handleFilterUpdate("nova_construcao", e.target.value)}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              placeholder="Nova Construção"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Distrito"
              name="district"
              value={String(filters.district || "")}
              onChange={handleDistrictFilterChange}
              options={districts.map((d) => ({ label: d.name, value: String(d.id) }))}
              placeholder="Todos os distritos"
            />
            <SelectField
              label="Município"
              name="municipality"
              value={String(filters.municipality || "")}
              onChange={(e) => handleFilterUpdate("municipality", e.target.value)}
              options={municipalities.map((m) => ({ label: m.name, value: String(m.id) }))}
              placeholder="Todos os municípios"
              disabled={!filters.district}
            />
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[#0A2647]">
              Intervalo de Preço
            </label>
            <PriceRangeSlider
              priceRange={filters.priceRange || [0, 2000000]}
              setPriceRange={(range) => {
                handleFilterUpdate("priceRange", range);
                // Also update the API fields
                handleFilterUpdate("price_min", range[0]);
                handleFilterUpdate("price_max", range[1]);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SelectField
            label="Certificado Energético"
            name="certificado_energetico"
            value={filters.certificado_energetico ?? ""}
            onChange={(e) => handleFilterUpdate("certificado_energetico", e.target.value)}
            options={["A+", "A", "B", "B-", "C", "D", "E", "F"].map((v) => ({ label: v, value: v }))}
            placeholder="Certificado Energético"
          />
          
          {/* Area Filters */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#0A2647]">Área Útil (m²)</h4>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Área Útil Mínima (m²)"
                name="area_util"
                type="number"
                value={filters.area_util || ""}
                onChange={(e) => handleFilterUpdate("area_util", e.target.value)}
                placeholder="Mínima"
              />
              <InputField
                label="Área Útil Máxima (m²)"
                name="areaUtilMax"
                type="number"
                value={filters.areaUtilMax || ""}
                onChange={(e) => handleFilterUpdate("areaUtilMax", e.target.value)}
                placeholder="Máxima"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#0A2647]">Área Bruta (m²)</h4>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Área Bruta Mínima (m²)"
                name="area_bruta"
                type="number"
                value={filters.area_bruta ?? ""}
                onChange={(e) => handleFilterUpdate("area_bruta", e.target.value)}
                placeholder="Mínima"
              />
              <InputField
                label="Área Bruta Máxima (m²)"
                name="areaBrutaMax"
                type="number"
                value={filters.areaBrutaMax ?? ""}
                onChange={(e) => handleFilterUpdate("areaBrutaMax", e.target.value)}
                placeholder="Máxima"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <CheckboxGroup
              label="Comodidades"
              options={extraInfos}
              selectedOptions={filters.extraInfos || []}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      )}

      <div className="flex justify-start pt-4 border-t">
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}

AdvancedSearchFilters.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
  onClearFilters: PropTypes.func,
};