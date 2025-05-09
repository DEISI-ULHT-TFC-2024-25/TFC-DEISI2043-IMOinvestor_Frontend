import { useNavigate } from "react-router-dom";
import PropertyForm from "@components/PropertyForm";
import useCreateProperty from "@hooks/useCreateProperty";
import useAuth from "@hooks/useAuth";

export default function CreateProperty() {
  const { submitProperty, loading, error } = useCreateProperty();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    if (!user || !user.organization_ids?.length) {
      alert("Utilizador sem organização atribuída.");
      return;
    }

    const finalPayload = {
      ...payload,
      organization_id: user.organization_ids[0],
    };

    const success = await submitProperty(finalPayload);
    if (success) navigate("/my-properties");
  };

  return (
    <div className="px-4 py-8">
      <PropertyForm
        title="Criar Imóvel"
        onSubmit={handleCreate}
        submitLabel={loading ? "A criar..." : "Criar Imóvel"}
      />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
    </div>
  );
}
