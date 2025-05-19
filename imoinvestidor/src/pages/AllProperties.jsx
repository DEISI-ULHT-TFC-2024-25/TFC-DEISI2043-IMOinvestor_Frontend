import { useEffect, useState } from "react";
import { getProperties } from "@services/propertyService";
import useDeleteProperty from "@hooks/useDeleteProperty";
import PropertiesSearchBar from "@properties/PropertiesSearchBar";
import PropertiesList from "@properties/PropertiesList";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@common/ConfirmDialog";

export default function AllProperties() {
  const navigate = useNavigate();
  const { removeProperty } = useDeleteProperty();

  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    getProperties()
      .then(setPropriedades)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

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

  const filtered = propriedades.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Todas as Propriedades
        </h1>
        <button
          onClick={() => navigate("/create-property")}
          className="bg-[#CFAF5E] text-white px-5 py-2 rounded-md hover:bg-[#b89a4e] transition text-sm sm:text-base"
        >
          Nova Propriedade
        </button>
      </div>

      <PropertiesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {successMessage && (
        <div className="text-green-600 bg-green-100 border border-green-300 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {selectedToDelete && (
        <ConfirmDialog
          message={`Tem a certeza que quer apagar "${selectedToDelete.title}"?`}
          onCancel={() => setSelectedToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          Não existem propriedades registadas.
        </p>
      ) : (
        <PropertiesList
          properties={filtered}
          onDelete={setSelectedToDelete}
        />
      )}
    </section>
  );
}
