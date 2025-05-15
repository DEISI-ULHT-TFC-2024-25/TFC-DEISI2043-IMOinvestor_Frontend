import { useEffect, useState } from "react";
import { getUser } from "@services/authService";
import { getPropertiesByOrganization } from "@services/propertyService";
import { getOrganizationById } from "@services/organizationService";
import useDeleteProperty from "@hooks/useDeleteProperty";
import useDistricts from "@hooks/useDistricts";
import useMunicipalities from "@hooks/useMunicipalities";
import { handleDistrictChange } from "@utils/locationUtils";

import PropertiesSearchBar from "@properties/PropertiesSearchBar";
import PropertiesList from "@properties/PropertiesList";
import PropertiesEmptyState from "@properties/PropertiesEmptyState";
import ConfirmDialog from "@common/ConfirmDialog";
import SelectField from "@common/SelectField";
import { useNavigate } from "react-router-dom";

export default function MyProperties() {
  const navigate = useNavigate();
  const user = getUser();
  const orgId = user?.organization_ids?.[0];

  const { removeProperty } = useDeleteProperty();
  const { districts } = useDistricts();
  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const { municipalities, loadByDistrict } = useMunicipalities(selectedDistrict);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [orgName, setOrgName] = useState("Organização");

  useEffect(() => {
    if (!orgId) {
      setError(new Error("Nenhuma organização associada ao utilizador."));
      setLoading(false);
      return;
    }

    getPropertiesByOrganization(orgId)
      .then(setPropriedades)
      .catch(setError)
      .finally(() => setLoading(false));

    getOrganizationById(orgId)
      .then((org) => setOrgName(org.name))
      .catch(() => setOrgName("Organização"));
  }, [orgId]);

  const handleConfirmDelete = async () => {
    const success = await removeProperty(selectedToDelete.id);
    if (success) {
      setPropriedades((prev) => prev.filter((p) => p.id !== selectedToDelete.id));
      setSuccessMessage("Propriedade apagada com sucesso!");
    } else {
      setSuccessMessage("Erro ao apagar a propriedade.");
    }
    setSelectedToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filtered = propriedades.filter((p) => {
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
        <h1 className="text-xl sm:text-2xl font-semibold text-[#0A2647]">
          Propriedades da Organização: {orgName}
        </h1>
        <button
          onClick={() => navigate("/create-property")}
          className="bg-[#CFAF5E] text-white px-5 py-2 rounded-md hover:bg-[#b89a4e] transition text-sm sm:text-base"
        >
          Nova Propriedade
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <PropertiesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SelectField
          name="distrito"
          value={String(selectedDistrict)}
          onChange={async (e) => {
            await handleDistrictChange({
              newDistrict: String(e.target.value),
              currentMunicipality: selectedMunicipality,
              loadByDistrict,
              setDistrict: setSelectedDistrict,
              setMunicipality: setSelectedMunicipality,
            });
          }}
          options={districts.map((d) => ({ label: d.name, value: String(d.id) }))}
          placeholder="Distrito"
        />

        <SelectField
          name="municipio"
          value={String(selectedMunicipality)}
          onChange={(e) => setSelectedMunicipality(String(e.target.value))}
          options={municipalities.map((m) => ({
            label: m.name,
            value: String(m.id),
          }))}
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
        <PropertiesEmptyState orgName={orgName} />
      ) : (
        <PropertiesList properties={filtered} onDelete={setSelectedToDelete} />
      )}
    </section>
  );
}
