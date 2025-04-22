import { useState } from "react";
import useCreateProperty from "../hooks/useCreateProperty";
import PropertyForm from "../components/PropertyForm";
import { useNavigate } from "react-router-dom";

export default function CreateProperty() {
  const { submitProperty, loading, error } = useCreateProperty();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setFormSubmitted(true);
      const success = await submitProperty(formData);
      if (success) {
        alert("Imóvel criado com sucesso!");
        navigate("/my-properties");
      } else {
        console.error("Failed to create property:", error);
      }
    } catch (err) {
      console.error("Error in handleCreate:", err);
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
