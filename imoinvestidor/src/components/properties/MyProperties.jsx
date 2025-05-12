import { useEffect, useState } from "react";
import { getUser } from "@services/authService";
import { getPropertiesByOrganization } from "@services/propertyService";
import { fetchOrganizations } from "@services/organizationService";
import useDeleteProperty from "@hooks/useDeleteProperty";

import PropertiesHeader from "./PropertiesHeader";
import PropertiesSearchBar from "./PropertiesSearchBar";
import PropertiesList from "./PropertiesList";
import PropertiesEmptyState from "./PropertiesEmptyState";
import ConfirmDialog from "@common/ConfirmDialog";

export default function MyProperties() {
  const user = getUser();
  const orgId = user?.organization_ids?.[0];

  const { removeProperty } = useDeleteProperty();

  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

    fetchOrganizations()
      .then((orgs) => {
        const matched = orgs.find((org) => org.id === orgId);
        if (matched) setOrgName(matched.name);
      })
      .catch(() => setOrgName("Organização"));
  }, [orgId]);

  const handleConfirmDelete = async () => {
    const success = await removeProperty(selectedToDelete.id);
    if (success) {
      setPropriedades((prev) => prev.filter(p => p.id !== selectedToDelete.id));
      setSuccessMessage("Propriedade apagada com sucesso!");
    } else {
      setSuccessMessage("Erro ao apagar a propriedade.");
    }
    setSelectedToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filtered = propriedades.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <section className="p-6 text-center">Carregando propriedades…</section>;
  if (error) return <section className="p-6 text-center text-red-600">Erro: {error.message}</section>;

  return (
    <section className="p-6">
      <PropertiesHeader orgName={orgName} />
      <PropertiesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
