import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { getUser } from "@services/authService";
import {getPropertiesByOrganization,} from "@services/propertyService";

import useDeleteProperty from "@hooks/useDeleteProperty";
import { PropertyCard } from "@common/PropertyCard";
import ConfirmDialog from "@common/ConfirmDialog";

export default function MyProperties() {
  const navigate = useNavigate();
  const user = getUser();
  const orgId = user?.organization_ids?.[0];

  const { removeProperty } = useDeleteProperty();

  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
  }, [orgId]);

  const handleConfirmDelete = async () => {
    const success = await removeProperty(selectedToDelete.id);
    if (success) {
      setPropriedades(prev =>
        prev.filter(p => p.id !== selectedToDelete.id)
      );
      setSuccessMessage("Propriedade apagada com sucesso!");
    } else {
      setSuccessMessage("Erro ao apagar a propriedade.");
    }

    setSelectedToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (loading) {
    return (
      <section className="p-6 text-center">
        <p>Carregando propriedades…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6 text-center text-red-600">
        <p>Erro ao carregar propriedades: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0A2647]">Minhas Propriedades</h1>
        <button
          onClick={() => navigate("/create-property")}
          className="bg-[#CFAF5E] text-white px-4 py-2 rounded hover:bg-[#b89a4e] transition"
        >
          Criar Nova
        </button>
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

      {propriedades.length === 0 ? (
        <div className="text-center mt-16 text-[#0A2647]">
          <h2 className="text-xl font-semibold mb-4">Ainda não tem propriedades criadas.</h2>
          <button
            onClick={() => navigate("/create-property")}
            className="bg-[#CFAF5E] text-white px-6 py-3 rounded-md hover:bg-[#b89a4e] transition"
          >
            Adicionar Propriedade
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propriedades.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.name}
              tipologia={property.tipologia ?? "T?"}
              casasBanho={property.numero_casas_banho ?? "0"}
              areaUtil={property.area_util}
              price={`${property.preco_minimo?.toLocaleString()} € – ${property.preco_maximo?.toLocaleString()} €`}
              street={property.street}
              district={String(property.district)}
              onClick={() => navigate(`/edit-property/${property.id}`)}
              actions={
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedToDelete(property);
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Apagar"
                >
                  <Trash2 size={20} />
                </button>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
