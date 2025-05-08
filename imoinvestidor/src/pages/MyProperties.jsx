import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPropertiesByOrganization } from "@services/propertyService";
import { getUser } from "@services/authService";

export default function MyProperties() {
  const navigate = useNavigate();

  const user = getUser();
  const orgId = user?.organization_ids?.[0];

  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h1 className="text-2xl font-semibold text-[#0A2647]">
          Minhas Propriedades
        </h1>
        <button
          onClick={() => navigate("/create-property")}
          className="bg-[#CFAF5E] text-white px-4 py-2 rounded hover:bg-[#b89a4e] transition"
        >
          Criar Nova
        </button>
      </div>

      {propriedades.length === 0 ? (
        <div className="text-center mt-16 text-[#0A2647]">
          <h2 className="text-xl font-semibold mb-4">
            Ainda não tem propriedades criadas.
          </h2>
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
            <div
              key={property.id}
              onClick={() => navigate(`/edit-property/${property.id}`)}
              className="bg-white p-4 rounded shadow hover:ring-2 hover:ring-[#CFAF5E] cursor-pointer transition"
            >
              <h3 className="font-bold text-[#0A2647] mb-2">
                {property.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {property.street}, {property.postal_code}
              </p>
              <p className="font-semibold text-[#CFAF5E]">
                {property.preco_minimo?.toLocaleString()} € –{' '}
                {property.preco_maximo?.toLocaleString()} €
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}