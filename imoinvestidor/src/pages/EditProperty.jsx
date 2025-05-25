import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyForm from "@properties/PropertyForm";
import useUpdateProperty from "@hooks/useUpdateProperty";
import { getPropertyById } from "@services/propertyService";
import useAuth from "@hooks/useAuth";

export default function EditProperty() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { submitUpdate, loading, error } = useUpdateProperty();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const property = await getPropertyById(id);
        setInitialData(property);
      } catch (err) {
        console.error("Erro ao carregar imóvel:", err);
      }
    })();
  }, [id]);

  const handleEdit = async (payload) => {
    if (!user || !user.organization_ids?.length) {
      alert("Utilizador sem organização atribuída.");
      return null;
    }

    const finalPayload = {
      ...payload,
      organization_id: user.organization_ids[0],
    };

    const updatedProperty = await submitUpdate(id, finalPayload);
    if (updatedProperty?.id) navigate("/my-properties");

    return updatedProperty;
  };
  
  if (!initialData) return <p>A carregar...</p>;

  return (
    <div className="p-6">
      <PropertyForm
        title="Editar Imóvel"
        initialData={initialData}
        onSubmit={handleEdit}
        submitLabel={loading ? "A guardar..." : "Guardar Alterações"}
      />
      {error && (
        <div className="text-red-600 mt-4">
          {error}
        </div>
      )}
    </div>
  );
}
