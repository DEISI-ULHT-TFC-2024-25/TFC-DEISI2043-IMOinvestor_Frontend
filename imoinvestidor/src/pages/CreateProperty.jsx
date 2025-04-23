import { useState } from "react";
import useCreateProperty from "../hooks/useCreateProperty";
import PropertyForm from "../components/PropertyForm";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CreateProperty() {
  const { submitProperty, loading, error } = useCreateProperty();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setFormSubmitted(true);

      if (!user || !user.organization_id) {
        alert("Utilizador sem organização atribuída.");
        return;
      }

      const payload = {
        ...formData,
        organization_id: user.organization_ids?.[0],
      };

      const success = await submitProperty(payload);

      if (success) {
        alert("Imóvel criado com sucesso!");
        navigate("/my-properties");
      } else {
        console.error("Falha ao criar propriedade:", error);
      }
    } catch (err) {
      console.error("Erro na criação:", err);
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <PropertyForm 
        onSubmit={handleCreate} 
        submitLabel={loading ? "A criar..." : "Criar Imóvel"} 
      />
      {error && formSubmitted && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4" role="alert">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
